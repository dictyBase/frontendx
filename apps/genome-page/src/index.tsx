import { createRoot } from "react-dom/client"
import "fontsource-roboto"
import "common/utils/icons" // fontawesome library
import { GenomePageApp } from "./main"

const main = async () => {
  if (import.meta.env.VITE_APP_DEPLOY_ENV === "mock") {
    const { default: worker } = await import("./mocks/browser")
    await worker.start({
      serviceWorker: {
        url: "/gene/mockServiceWorker.js",
      },
    })
  }

  const container = document.querySelector("#root")
  if (!container) throw new Error("Failed to find the root element")
  const root = createRoot(container)
  root.render(<GenomePageApp />)
}

main()
