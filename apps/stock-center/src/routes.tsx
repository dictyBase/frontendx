import { createBrowserRouter, RouteObject } from "react-router-dom"
import { HeaderRow } from "./components/HeaderRow"
import { bind, let as Olet, of, Do, match } from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import {
  type dynamicRoutesProperties,
  publicRoutes,
  protectedRoutes,
  buildMergedRoutes,
} from "./functional/routeManager"

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
