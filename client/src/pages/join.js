import React from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

const Join = () => (
  <Layout>
    <Header />
    <TextField
      id="code"
      label="Access code"
      className={styles.textField}
      margin="normal"
      variant="outlined"
    />
    <br />
    <TextField
      id="name"
      label="Your name"
      className={styles.textField}
      margin="normal"
      variant="outlined"
    />
    <br />
    <Button
      onClick={() => navigate("/lobby/")}
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

export default Join