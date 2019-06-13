import React from "react"
import "typeface-roboto"
import styles from "../styles.module.scss"
import Container from "@material-ui/core/Container"

export default ({ children }) => (
  <Container className={styles.app} maxWidth="sm">
    {children}
  </Container>
)
