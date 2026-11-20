import React from "react"
import { createRoot } from "react-dom/client"
import { createTheme, ThemeProvider } from "@material-ui/core"
import { Demo } from "./App"
import "@fontsource/fira-code"

const theme = createTheme({
  typography: {
    fontFamily: ["Fira Code", "monospace"].join(","),
  },
  palette: {
    primary: { main: "#2979ff" },
  },
})

const container = document.querySelector("#root")
if (!container) throw new Error("Failed to find the root element")
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Demo />
    </ThemeProvider>
  </React.StrictMode>,
)
