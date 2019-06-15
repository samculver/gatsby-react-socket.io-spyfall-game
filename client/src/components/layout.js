import React from "react"
import "typeface-roboto"
import styles from "../styles.module.scss"
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import Container from "@material-ui/core/Container"

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: purple,
  },
});

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <Container className={styles.app} maxWidth="md">
      {children}
    </Container>
  </ThemeProvider>
)
