import React from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import { socket } from "../socket"
import Layout from "../components/layout"
import Header from "../components/header"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

const Create = () => {
  let nameInput = React.createRef()

  const createGame = () => {
    const nick = nameInput.current.value
    
  }

  return (
    <Layout>
      <Header />
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
        onClick={createGame}
        variant="outlined"
        color="primary"
        className={styles.button}
      >
        Create
      </Button>
      <Button
        onClick={() => navigate("/lobby/")}
        variant="outlined"
        color="primary"
        className={styles.button}
      >
        Back
      </Button>
    </Layout>
  )
}

export default Create
