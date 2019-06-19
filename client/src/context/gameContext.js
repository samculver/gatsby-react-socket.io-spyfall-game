import React from "react"
import { socket } from '../socket'

const defaultState = {
  user: null,
  gameCode: null,
  nick: null,
  setUser: () => {},
  setGameCode: () => {},
  setNick: () => {}
}

const GameContext = React.createContext(defaultState)

class GameProvider extends React.Component {
  state = {
    user: null,
    gameCode: null,
    nick: null
  }

  setUser = (user) => {
    this.setState({ user })
  }

  setGameCode = (gameCode) => {
    this.setState({ gameCode })
  }

  setNick = (nick) => {
    this.setState({ nick })
  }

  render() {
    const { children } = this.props
    const { user, gameCode, nick } = this.state
    return (
      <GameContext.Provider
        value={{
          user,
          gameCode,
          nick,
          setUser: this.setUser,
          setGameCode: this.setGameCode,
          setNick: this.setNick
        }}
      >
        {children}
      </GameContext.Provider>
    )
  }
}

export default GameContext

export { GameProvider }
