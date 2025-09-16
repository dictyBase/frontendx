import ReactDOM from "react-dom"
import "fontsource-roboto"
import "common/utils/icons" // fontawesome library
import { GenomePageApp } from "./main"

const main = async () => {
  // Activate MSW
  if (import.meta.env.VITE_MOCK_SERVER === "on") {
    const { enableMock } = await import("mocks")
    await enableMock()
  }

  const container = document.querySelector("#root")
  if (!container) throw new Error("Failed to find the root element")
  ReactDOM.render(<GenomePageApp />, document.querySelector("#root"))
}

main()
