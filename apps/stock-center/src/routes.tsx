import { type FunctionComponent } from "react"
import { ACCESS } from "./types"
import { createBrowserRouter, RouteObject } from "react-router-dom"
import { HeaderRow } from "./components/HeaderRow"
import { Protected } from "./components/auth/Protected"
import { Callback, Login } from "auth"

type PageImport = {
  default: FunctionComponent
  access: ACCESS
}

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
  const routeChildren: Array<RouteObject> = Object.keys(pages)
    .filter((route) => pages[route].access != ACCESS.protected)
    .map((route) => {
      const Element = pages[route].default
      return { path: parsePath(route), element: <Element /> }
    })
  const routeChildrenWithAuth: Array<RouteObject> = Object.keys(pages)
    .filter((route) => pages[route].access == ACCESS.protected)
    .map((route) => {
      const Element = pages[route].default
      return { path: parsePath(route), element: <Element /> }
    })
  routeChildren.push({
    element: <Protected />,
    children: routeChildrenWithAuth,
  })
  routeChildren.push({ path: "/callback", element: <Callback /> })
  routeChildren.push({ path: "/login", element: <Login /> })
  return [{ element: <HeaderRow />, children: routeChildren }]
}

const dscRouter = createBrowserRouter(routeObject(), {
  basename: import.meta.env.VITE_APP_BASENAME,
})

export { dscRouter }
