import { createRoot } from "react-dom/client"
import "fontsource-roboto"
import App from "./App"

const root = createRoot(document.querySelector("#root")!)
root.render(<App />)
