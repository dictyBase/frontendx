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

type PageComponentData = {
  default: FunctionComponent
  access: ACCESS
}
type mergedRoutesProperties = {
  publicR: Array<RouteObject>
  protectedR: Array<RouteObject>
}
type dynamicRoutesProperties = Record<string, PageComponentData>

const pathParts = (path: string) =>
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

const mapToRouteObject = (route: string, value: PageComponentData) => {
  const PageComponent = value.default
  return { path: pathParts(route), element: <PageComponent /> }
}

const publicRoutes = (allRoutes: dynamicRoutesProperties): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter((v) => v.access !== ACCESS.protected),
    Rcollect(Ord)(mapToRouteObject),
  )
const protectedRoutes = (
  allRoutes: dynamicRoutesProperties,
): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter((v) => v.access === ACCESS.protected),
    Rcollect(Ord)(mapToRouteObject),
  )
const buildMergedRoutes = ({ publicR, protectedR }: mergedRoutesProperties) =>
  pipe(
    publicR,
    Arpend({ children: protectedR, element: <Protected /> } as RouteObject),
    Arpend({ path: "/callback", element: <Callback /> } as RouteObject),
    Arpend({ path: "/login", element: <Login /> } as RouteObject),
  )

const createRouteDefinition = (allRoutes: dynamicRoutesProperties) =>
  pipe(
    Do,
    bind("publicR", () => pipe(allRoutes, publicRoutes, of)),
    bind("protectedR", () => pipe(allRoutes, protectedRoutes, of)),
    Olet("mergedR", buildMergedRoutes),
    Olet("finalRoutes", ({ mergedR }) =>
      Array.of({
        element: <HeaderRow />,
        children: mergedR,
      }),
    ),
    match(
      () => [],
      ({ finalRoutes }) => finalRoutes,
    ),
  ) as Array<RouteObject>

const dscRouter = createBrowserRouter(createRouteDefinition(dynamicRoutes), {
  basename: import.meta.env.VITE_APP_BASENAME,
})

export { dscRouter }
