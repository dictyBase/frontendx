import ReactDOM from "react-dom"
import "fontsource-roboto"
import "./common/utils/polyfills"
import "./common/utils/icons" // fontawesome library
import { App } from "./app/layout/App"

const main = async () => {
  // Activate MSW
  if (import.meta.env.VITE_APP_DEPLOY_ENV === "mock") {
    const { worker } = await import("./mocks/browser")
    await worker.start()
  }

  ReactDOM.render(<App />, document.querySelector("#root"))
}

main()
