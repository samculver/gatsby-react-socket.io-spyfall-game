import React from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Button from "@material-ui/core/Button"

const Lobby = () => (
  <Layout>
    <h2>Waiting for players</h2>
    <h3>Access code: 4sfu2i</h3>
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

export default Lobby
