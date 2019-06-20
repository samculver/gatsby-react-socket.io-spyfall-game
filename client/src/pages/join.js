import React, { useContext } from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import GameContext from "../context/gameContext"

const Join = () => {
  const { socket, setNick, setGameCode } = useContext(GameContext)
  let gameCodeInput = React.createRef()
  let nameInput = React.createRef()

  const tryJoinGame = async () => {
    const nick = nameInput.current.value
    const gameCode = gameCodeInput.current.value

    // add validation

    if (nick && gameCode) {
      socket.emit("create nick", nick, () => {
        console.log("created nickname")
        setNick(nick)
        setGameCode(gameCode)
        navigate("/lobby/")
      })
    }
  }

  return (
    <Layout>
      <Header />
      <TextField
        id="code"
        label="Access code"
        className={styles.textField}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        inputRef={gameCodeInput}
      />
      <br />
      <TextField
        id="name"
        label="Your name"
        className={styles.textField}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        inputRef={nameInput}
      />
      <br />
      <Button
        onClick={tryJoinGame}
        variant="outlined"
        color="primary"
        className={styles.button}
      >
        Join
      </Button>
      <Button
        onClick={() => navigate("/")}
        variant="outlined"
        color="primary"
        className={styles.button}
      >
        Back
      </Button>
    </Layout>
  )
}

export default Join
