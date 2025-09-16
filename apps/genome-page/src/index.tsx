import ReactDOM from "react-dom/client"
import "fontsource-roboto"
import "./common/utils/icons" // fontawesome library
import { App } from "./components/layout/App"

const main = async () => {
  // Activate MSW
  if (import.meta.env.VITE_MOCK_SERVER === "on") {
    const { enableMock } = await import("../mocks")
    await enableMock()
  }

  const container = document.querySelector("#root")
  if (!container) throw new Error("Failed to find the root element")
  const root = ReactDOM.createRoot(container)
  root.render(<App />)
}

main()

