import React from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import Header from "../components/header"
import Button from "@material-ui/core/Button"

const Play = () => (
  <Layout>
    <Header />
    <h2>How to play</h2>
    <p>...</p>
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

export default Play
