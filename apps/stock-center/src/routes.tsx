import { type FunctionComponent } from "react"
import { ACCESS } from "./types"
import { createBrowserRouter } from "react-router-dom"

type PageImport = {
  default: FunctionComponent
  access: ACCESS
}

const parsePath = (path: string) =>
  path
    .replace(/^(?:\/src\/pages\/index\.tsx)$/, "/")
    .replace(/\[\.{3}.+]/, "*")
    .replace(/\[(.+)\]/, ":$1")

const pages: Record<string, PageImport> = import.meta.glob(
  "/src/pages/**/**/*.tsx",
  {
    eager: true,
  },
)

const routeObject = Object.keys(pages).map((route) => {
  const Element = pages[route].default
  return { path: parsePath(route), element: <Element /> }
})

const router = createBrowserRouter(routeObject, {
  basename: import.meta.env.VITE_APP_BASENAME,
})

export { router }
