import { lazy, type ComponentType } from "react"
import { createBrowserRouter, RouteObject } from "react-router-dom"
import { bind, let as Olet, of, Do, match } from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import {
  type dynamicRoutesProperties,
  publicRoutes,
  protectedRoutes,
  privateRoutes,
  buildMergedRoutes,
} from "@dictybase/auth-mui5"
import { NotFoundError } from "@dictybase/ui-common"
// eslint-disable-next-line import/no-unresolved
import { pagesMetadata } from "virtual:dictybase/page-metadata"

// Each page module is referenced only through a dynamic import so Vite can
// emit it as a separate chunk that is loaded on demand. Route metadata
// (access, roles) is generated at build time by the page-metadata Vite
// plugin so the entry bundle never has to statically import a page.
const componentLoaders = import.meta.glob("/src/pages/**/**/*.tsx") as Record<
  string,
  () => Promise<{ default: ComponentType }>
>

const dynamicRoutes: dynamicRoutesProperties = Object.fromEntries(
  Object.entries(componentLoaders).map(([path, loader]) => {
    const metadata = pagesMetadata[path] ?? {
      access: undefined,
      roles: undefined,
    }
    return [
      path,
      {
        default: lazy(loader),
        access: metadata.access,
        roles: metadata.roles,
      },
    ]
  }),
)

const createRouteDefinition = (allRoutes: dynamicRoutesProperties) =>
  pipe(
    Do,
    bind("publicR", () => pipe(allRoutes, publicRoutes, of)),
    bind("protectedR", () => pipe(allRoutes, protectedRoutes, of)),
    bind("privateR", () => pipe(allRoutes, privateRoutes, of)),
    Olet("mergedR", buildMergedRoutes),
    Olet("finalR", ({ mergedR }) => [
      { errorElement: <NotFoundError />, children: mergedR },
    ]),
    match(
      () => [] as Array<RouteObject>,
      ({ finalR }) => finalR,
    ),
  )

const genomepageRouter = createBrowserRouter(
  createRouteDefinition(dynamicRoutes),
  {
    basename: "/gene",
  },
)

export { genomepageRouter }
