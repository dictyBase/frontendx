import { type FunctionComponent } from "react"
import { RouteObject } from "react-router-dom"
import { collect as Rcollect, filter as Rfilter } from "fp-ts/Record"
import { Ord } from "fp-ts/string"
import { append as Arpend } from "fp-ts/Array"
import { pipe } from "fp-ts/function"
import { Callback } from "../Callback"
import { Login } from "../Login"
import { Protected } from "../Protected"
import { Private } from "../Private"

enum ACCESS {
  public,
  protected,
  private,
}

type PageComponentData = {
  default: FunctionComponent
  access: ACCESS
  roles?: Array<string>
}
type mergedRoutesProperties = {
  publicR: Array<RouteObject>
  protectedR: Array<RouteObject>
  privateR: Array<RouteObject>
}
type dynamicRoutesProperties = Record<string, PageComponentData>

const pathParts = (path: string) =>
  path
    .replaceAll(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+]/, "*")
    .replace(/\[(.+)]/, ":$1")

const mapToRouteObject = (route: string, value: PageComponentData) => {
  const PageComponent = value.default
  const { roles } = value
  if (roles) {
    return {
      element: <Private roles={roles} />,
      children: [{ path: pathParts(route), element: <PageComponent /> }],
    }
  }
  return { path: pathParts(route), element: <PageComponent /> }
}

const publicRoutes = (allRoutes: dynamicRoutesProperties): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter((v) => v.access !== ACCESS.protected),
    Rcollect(Ord)(mapToRouteObject),
  )
const privateRoutes = (
  allRoutes: dynamicRoutesProperties,
): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter((v) => v.access === ACCESS.private),
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
const buildMergedRoutes = ({
  publicR,
  protectedR,
  privateR,
}: mergedRoutesProperties) =>
  pipe(
    publicR,
    Arpend({ children: protectedR, element: <Protected /> } as RouteObject),
    Arpend({ children: privateR, element: <Protected /> } as RouteObject),
    Arpend({ path: "/callback", element: <Callback /> } as RouteObject),
    Arpend({ path: "/login", element: <Login /> } as RouteObject),
  )

export {
  publicRoutes,
  protectedRoutes,
  privateRoutes,
  buildMergedRoutes,
  type dynamicRoutesProperties,
  ACCESS,
}
