import React from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Button from "@material-ui/core/Button"

const Lobby = () => (
  <Layout>
    <h2>Waiting for players</h2>
    <h3>Access Code: 4sfu2i</h3>
    <ol>
      <li>Player 1</li>
    </ol>
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
