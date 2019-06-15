import React from "react"

import { GameProvider } from "./src/context/gameContext"

export const wrapRootElement = ({ element }) => (
  <GameProvider>{element}</GameProvider>
)