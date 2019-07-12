import React from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import GameContext from "../context/gameContext"
import Layout from "../components/layout"
import Button from "@material-ui/core/Button"

class Lobby extends React.Component {
  static contextType = GameContext

  state = {
    users: [],
  }

  componentDidMount() {
    const { socket, gameCode } = this.context
    socket.emit("join", gameCode, users => {
      console.log("joined!")
      this.setState({ users })

      socket.on("user joined", this.userJoined)
      socket.on("user left", this.userLeft)
    })
  }

  render() {
    const { users } = this.state
    return (
      <Layout>
        <h2>Waiting for players</h2>
        <h3>{`Access code: ${this.context.gameCode}`}</h3>
        <div className={styles.playersList}>
          <h3>Players:</h3>
          {users.map((user, i) => (
            <li key={i}>{user.nick}</li>
          ))}
        </div>
        <Button
          onClick={this.startGame}
          variant="outlined"
          color="primary"
          className={styles.button}
        >
          Start
        </Button>
        <Button
          onClick={this.disconnect}
          variant="outlined"
          color="primary"
          className={styles.button}
        >
          Leave
        </Button>
      </Layout>
    )
  }

  disconnect = () => {
    this.context.socket.emit("disconnect")
    navigate("/")
  }

  userJoined = joiner => {
    this.setState({ users: [...this.state.users, joiner] })
  }

  userLeft = leaver => {
    this.setState({
      users: this.state.users.filter(user => user.token !== leaver.token),
    })
  }

  startGame = () => {
    this.context.socket.emit("start game")
  }
}

export default Lobby
