import React, { useContext } from "react"
import * as io from 'socket.io-client';
import GameContext, { GameProvider } from "./src/context/gameContext"

export const wrapRootElement = ({ element }) => (
  <GameProvider>{element}</GameProvider>
)

export const onClientEntry = () => {

  //const { setUser } = useContext(GameContext)
/*
  console.log("Starting socket connection")
  const socket = io(`ws://localhost:8081`)

  let latestVersion = 0;

  socket.emit('get version', (version) => {
    latestVersion = version;
    console.log('running version:', version);
  })

  socket.emit("identify", localStorage.getItem("token"), user => {
    console.log("identified", user)
    localStorage.setItem("token", user.token)
    //setUser(user)
  })
  */
}
