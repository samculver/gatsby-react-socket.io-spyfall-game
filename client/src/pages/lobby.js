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

  render() {
    return (
      <Layout>
        <h2>Waiting for players</h2>
        <h3>{`Access code: ${this.context.gameCode}`}</h3>
        <div className={styles.playersList}>
          <h3>Players:</h3>
          <ul>
            <li>Player 1</li>
            <li>Player 2</li>
            <li>Player 3</li>
          </ul>
        </div>
        <Button
          onClick={() => navigate("/play/")}
          variant="outlined"
          color="primary"
          className={styles.button}
        >
          Start
        </Button>
        <Button
          onClick={() => navigate("/")}
          variant="outlined"
          color="primary"
          className={styles.button}
        >
          Leave
        </Button>
      </Layout>
    )
  }
}

export default Lobby
