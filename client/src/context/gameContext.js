import React from "react"
import * as io from "socket.io-client"
import { navigate } from "gatsby"

const defaultState = {
  user: null,
  gameCode: null,
  nick: null,
  setUser: () => {},
  setGameCode: () => {},
  setNick: () => {},
  socket: () => {},
}

// create our context
const GameContext = React.createContext(defaultState)

// also create a provider to wrap around the root element
class GameProvider extends React.Component {
  constructor(props) {
    super(props)

    let activeEnv =
      process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
    const protocol =
      typeof window !== "undefined" && window.location.protocol === "https:"
        ? "wss"
        : "ws"
    const socketServer =
      activeEnv === "development"
        ? "localhost:8081"
        : "spyfallserver.azurewebsites.net"
    const socket = io(`${protocol}://${socketServer}`, {transports: ['websocket'], upgrade: false})

    this.state = {
      user: null,
      gameCode: null,
      nick: null,
      socket: socket,
    }
  }

  setUser = user => {
    console.log(`user set! ${user}`)
    this.setState({ user })
  }

  setGameCode = gameCode => {
    this.setState({ gameCode })
  }

  setNick = nick => {
    this.setState({ nick })
  }

  componentDidMount() {
    const { socket } = this.state

    socket.emit("get version", version => {
      console.log("running version:", version ? version : 0)
    })

    socket.emit("identify", localStorage.getItem("token"), user => {
      console.log("identified", user)
      localStorage.setItem("token", user.token)
      this.setState({ user })
    })

    socket.on("game start", () => navigate("/play"))
  }

  render() {
    const { children } = this.props
    const { user, gameCode, nick, socket } = this.state
    return (
      <GameContext.Provider
        value={{
          user,
          gameCode,
          nick,
          setUser: this.setUser,
          setGameCode: this.setGameCode,
          setNick: this.setNick,
          socket: socket,
        }}
      >
        {children}
      </GameContext.Provider>
    )
  }
}

export default GameContext

export { GameProvider }
