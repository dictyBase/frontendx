import { createBrowserRouter, RouteObject } from "react-router-dom"
import { bind, let as Olet, of, Do, match } from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import {
  type dynamicRoutesProperties,
  publicRoutes,
  protectedRoutes,
  buildMergedRoutes,
} from "auth"
import { FrontPageApp } from "../layout/FrontPageApp"

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
    Olet("mergedR", buildMergedRoutes),
    Olet("finalRoutes", ({ mergedR }) =>
      pipe(
        { path: "/", element: <FrontPageApp />, children: mergedR },
        Array.of,
      ),
    ),
    match(
      () => [],
      ({ finalRoutes }) => finalRoutes,
    ),
  ) as Array<RouteObject>

const frontpageRouter = createBrowserRouter(
  createRouteDefinition(dynamicRoutes),
)

export { frontpageRouter }
