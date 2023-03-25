import React from "react"
import ReactDOM from "react-dom"
import { createTheme, ThemeProvider } from "@material-ui/core"
import Demo from "./App"
import "@fontsource/fira-code"

const theme = createTheme({
  typography: {
    fontFamily: ["Fira Code", "monospace"].join(","),
  },
  palette: {
    primary: { main: "#2979ff" },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Demo />
    </ThemeProvider>
  </React.StrictMode>,
  document.querySelector("#root") as HTMLElement,
)
