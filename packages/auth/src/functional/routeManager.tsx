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
import { UnAuthorized } from "../UnAuthorized"
import { pathParts } from "../pathParts"

enum ACCESS {
  public,
  protected,
  private,
}

/**
 * Represents the data structure for a page component.
 */
type PageComponentData = {
  /**
   * The default function component.
   */
  default: FunctionComponent
  /**
   * The access level required to access the component.
   */
  access: ACCESS
  /**
   * An optional array of roles that are allowed to access the component.
   */
  roles?: Array<string>
}

/**
 * Represents the properties of merged routes.
 */
type mergedRoutesProperties = {
  /**
   * An array of public routes.
   */
  publicR: Array<RouteObject>

  /**
   * An array of protected routes.
   */
  protectedR: Array<RouteObject>

  /**
   * An array of private routes.
   */
  privateR: Array<RouteObject>
}

type dynamicRoutesProperties = Record<string, PageComponentData>

/**
 * Maps a route and its corresponding page component data to a route object.
 */
const mapToRouteObject = (route: string, value: PageComponentData) => {
  const PageComponent = value.default
  const { roles } = value
  if (roles) {
    // If roles exist, return a route object with a private element and a child route.
    return {
      element: <Private roles={roles} />, // Private component that requires specific roles.
      children: [{ path: pathParts(route), element: <PageComponent /> }], // Child route with the page component.
    }
  }
  // If no roles, return a route object with just the page component.
  return { path: pathParts(route), element: <PageComponent /> }
}

/**
 * Filters out the routes that are not protected and returns an array of RouteObject.
 */
const publicRoutes = (allRoutes: dynamicRoutesProperties): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter((v) => v.access !== ACCESS.protected),
    Rcollect(Ord)(mapToRouteObject),
  )

/**
 * Filters and collects private routes from the given array of dynamic routes.
 */
const privateRoutes = (
  allRoutes: dynamicRoutesProperties,
): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter((v) => v.access === ACCESS.private),
    Rcollect(Ord)(mapToRouteObject),
  )

/**
 * This function takes an array of dynamicRoutesProperties and returns an array of RouteObject.
 * It filters out the routes with access set to ACCESS.protected and transforms them into RouteObject.
 */
const protectedRoutes = (
  allRoutes: dynamicRoutesProperties,
): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rfilter((v) => v.access === ACCESS.protected),
    Rcollect(Ord)(mapToRouteObject),
  )

/**
 * Builds merged routes by combining public, protected, and private routes.
 */
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
    Arpend({ path: "/unauthorized", element: <UnAuthorized /> } as RouteObject),
  )

export {
  publicRoutes,
  protectedRoutes,
  privateRoutes,
  buildMergedRoutes,
  type dynamicRoutesProperties,
  ACCESS,
}
