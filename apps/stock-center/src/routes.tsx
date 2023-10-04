import { type FunctionComponent } from "react"
import { ACCESS } from "./types"
import { createBrowserRouter, RouteObject } from "react-router-dom"
import { HeaderRow } from "./components/HeaderRow"
import { Callback, Login, Protected } from "auth"
import { collect as Rcollect, filter as Rfilter } from "fp-ts/Record"
import { Ord } from "fp-ts/string"
import { append as Arpend } from "fp-ts/Array"
import { bind, let as Olet, of, Do, match } from "fp-ts/Option"
import { pipe } from "fp-ts/function"

type PageImportData = {
  default: FunctionComponent
  access: ACCESS
}
type mergedRoutesProperties = {
  publicR: Array<RouteObject>
  protectedR: Array<RouteObject>
}
type dynamicRoutesProperties = Record<string, PageImportData>

const parsePath = (path: string) =>
  path
    .replace(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+]/, "*")
    .replace(/\[(.+)\]/, ":$1")

const dynamicRoutes: dynamicRoutesProperties = import.meta.glob(
  "/src/pages/**/**/*.tsx",
  {
    eager: true,
  },
)

const routeData = (route: string, value: PageImportData) => {
  const Element = value.default
  return { path: parsePath(route), element: <Element /> }
}

const publicRoutes = (allRoutes: dynamicRoutesProperties): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter((v) => v.access !== ACCESS.protected),
    Rcollect(Ord)(routeData),
  )
const protectedRoutes = (
  allRoutes: dynamicRoutesProperties,
): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter((v) => v.access === ACCESS.protected),
    Rcollect(Ord)(routeData),
  )
const mergedRoutes = ({ publicR, protectedR }: mergedRoutesProperties) =>
  pipe(
    publicR,
    Arpend({ children: protectedR, element: <Protected /> } as RouteObject),
    Arpend({ path: "/callback", element: <Callback /> } as RouteObject),
    Arpend({ path: "/login", element: <Login /> } as RouteObject),
  )

const routeDefinition = (allRoutes: dynamicRoutesProperties) =>
  pipe(
    Do,
    bind("publicR", () => of(publicRoutes(allRoutes))),
    bind("protectedR", () => of(protectedRoutes(allRoutes))),
    Olet("mergedR", mergedRoutes),
    Olet("finalR", ({ mergedR }) =>
      Array.of({
        element: <HeaderRow />,
        children: mergedR,
      }),
    ),
    match(
      () => [],
      ({ finalR }) => finalR,
    ),
  ) as Array<RouteObject>

const dscRouter = createBrowserRouter(routeDefinition(dynamicRoutes), {
  basename: import.meta.env.VITE_APP_BASENAME,
})

export { dscRouter }
