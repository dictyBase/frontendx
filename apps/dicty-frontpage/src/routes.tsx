import { Suspense } from "react"
import { createBrowserRouter, RouteObject } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { map as Rmap, toEntries as RtoEntries } from "fp-ts/Record"
import { map as Amap } from "fp-ts/Array"
import {
  type LazyDynamicRoutesProperties,
  wrapLazyComponent,
  pathParts,
} from "@dictybase/auth-mui5"
import { NotFoundError } from "@dictybase/ui-common"

const dynamicRoutes = import.meta.glob("/src/pages/**/**/*.tsx")

const createRouteDefinition = (
  allRoutes: LazyDynamicRoutesProperties,
): Array<RouteObject> =>
  pipe(
    allRoutes,
    Rmap(wrapLazyComponent),
    RtoEntries,
    Amap(([path, PageComponent]) => ({
      path: pathParts(path),
      element: <PageComponent />,
    })),
    (routes) => [
      {
        errorElement: <NotFoundError />,
        children: routes,
      },
    ],
    // Olet("mergedR", buildMergedRoutes),
    // Olet("finalR", ({ mergedR }) => [
    //   { errorElement: <NotFoundError />, children: mergedR },
    // ]),
    // Omatch(
    //   () => [] as Array<RouteObject>,
    //   ({ finalR }) => finalR,
  )

const frontpageRouter = createBrowserRouter(
  createRouteDefinition(dynamicRoutes as LazyDynamicRoutesProperties),
  {
    basename: import.meta.env.VITE_APP_BASENAME,
  },
)

export { frontpageRouter }
