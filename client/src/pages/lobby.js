import React from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout"

const Lobby = () => (
  <Layout>
    <h1>Waiting for players...</h1>
    <p>Access Code: 4sfu2i</p>
    <ol>
      <li>Player 1</li>
    </ol>
    <button onClick={() => navigate("/play/")}>Start</button>
    <button onClick={() => navigate("/")}>Leave</button>
  </Layout>
)

export default Lobby
