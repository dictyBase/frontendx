import { type FunctionComponent } from "react"
import { ACCESS } from "./types"
import { createBrowserRouter } from "react-router-dom"
import { HeaderRow } from "./components/HeaderRow"
import { reduce } from "fp-ts/ReadonlyNonEmptyArray"

type PageImport = {
  default: FunctionComponent
  access: ACCESS
}

const concatPath = reduce(
  `http://${window.location.host}`,
  (acc: string, curr: string) => acc.concat(curr),
)
const callbackPath = concatPath([
  import.meta.env.VITE_APP_BASENAME,
  "/callback",
])
const homePath = concatPath([import.meta.env.VITE_APP_BASENAME])

const parsePath = (path: string) =>
  path
    .replace(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+]/, "*")
    .replace(/\[(.+)\]/, ":$1")

const pages: Record<string, PageImport> = import.meta.glob(
  "/src/pages/**/**/*.tsx",
  {
    eager: true,
  },
)

const routeObject = () => {
  const routeChildren = Object.keys(pages).map((route) => {
    const Element = pages[route].default
    return { path: parsePath(route), element: <Element /> }
  })
  return [{ element: <HeaderRow />, children: routeChildren }]
}

const dscRouter = createBrowserRouter(routeObject(), {
  basename: import.meta.env.VITE_APP_BASENAME,
})

export { dscRouter, callbackPath, homePath }
