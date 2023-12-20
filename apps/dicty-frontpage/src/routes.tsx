import { createBrowserRouter, RouteObject } from "react-router-dom"
import { bind, let as Olet, of, Do, match } from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import {
  type dynamicRoutesProperties,
  publicRoutes,
  protectedRoutes,
  privateRoutes,
  buildMergedRoutes,
} from "auth"

const dynamicRoutes: dynamicRoutesProperties = import.meta.glob(
  "/src/pages/**/**/*.tsx",
  {
    eager: true,
  },
)

const createRouteDefinition = (allRoutes: dynamicRoutesProperties) =>
  pipe(
    Do,
    bind("publicR", () => pipe(allRoutes, publicRoutes, of)),
    bind("protectedR", () => pipe(allRoutes, protectedRoutes, of)),
    bind("privateR", () => pipe(allRoutes, privateRoutes, of)),
    Olet("mergedR", buildMergedRoutes),
    match(
      () => [] as Array<RouteObject>,
      ({ mergedR }) => mergedR,
    ),
  )

const frontpageRouter = createBrowserRouter(
  createRouteDefinition(dynamicRoutes),
  {
    basename: import.meta.env.VITE_APP_BASENAME,
  },
)

export { frontpageRouter }
