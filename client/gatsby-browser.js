import React, { useContext } from "react"
import * as io from 'socket.io-client';
import GameContext, { GameProvider } from "./src/context/gameContext"

export const wrapRootElement = ({ element }) => (
  <GameProvider>{element}</GameProvider>
)
