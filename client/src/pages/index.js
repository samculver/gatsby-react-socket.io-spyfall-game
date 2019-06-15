import React from "react"
import { navigate } from "gatsby"
import styles from "../styles.module.scss"
import logo from "../images/spy-logo2.svg"
import Layout from "../components/layout"
import Header from "../components/header"
import Button from "@material-ui/core/Button"

const Home = () => (
  <Layout>
    <Header />
    <img src={logo} className={styles.logo} />
    <Button
      onClick={() => navigate("/new/")}
      variant="outlined"
      color="primary"
      className={styles.button}
    >
      New game
    </Button>
    <Button
      onClick={() => navigate("/join/")}
      variant="outlined"
      color="primary"
      className={styles.button}
    >
      Join game
    </Button>
  </Layout>
)

export default Home
