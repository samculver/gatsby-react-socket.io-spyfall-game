import React from "react"
//import { socket } from '../socket'
import * as io from 'socket.io-client';

const defaultState = {
  user: null,
  gameCode: null,
  nick: null,
  setUser: () => {},
  setGameCode: () => {},
  setNick: () => {},
}

// create our context
const GameContext = React.createContext(defaultState)

// also create a provider to wrap around the root element
class GameProvider extends React.Component {
  state = {
    user: null,
    gameCode: null,
    nick: null,
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
    /*
    socket.emit('identify', localStorage.getItem('token'), (user) => {
        console.log('identified', user);
        localStorage.setItem('token', user.token);
        this.setState({ user });
    });
    */

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
          setNick: this.setNick,
        }}
      >
        {children}
      </GameContext.Provider>
    )
  }
}

export default GameContext

export { GameProvider }
