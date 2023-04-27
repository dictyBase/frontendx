import React from "react"
import ReactDOM from "react-dom"
import App from "./Editor"
import "./main.css"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root") as HTMLElement,
)
