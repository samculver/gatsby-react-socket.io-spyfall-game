import React from "react"

import { GameProvider } from "./src/context/GameContext"

export const wrapRootElement = ({ element }) => (
  <GameProvider>{element}</GameProvider>
)