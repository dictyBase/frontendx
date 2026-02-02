import { pipe } from "fp-ts/function"
import { map as Amap, reduce as Areduce } from "fp-ts/Array"
import { RouteObject } from "react-router-dom"
import { union as Runion, collect as Rcollect } from "fp-ts/Record"
import { Ord as SOrd } from "fp-ts/string"
import { Magma } from "fp-ts/Magma"
import { FC } from "react"

type ComponentModuleImports = Record<string, FC>

const componentRoutes = import.meta.glob<ComponentModuleImports>("/src/*.tsx", {
  eager: true,
})

const errorComponentRoutes = import.meta.glob<ComponentModuleImports>(
  "/src/Error/*.tsx",
  {
    eager: true,
  },
)

const mockComponentProperties = pipe(await import("./props/index")) as Record<
  string,
  Array<any>
>

const mapToRouteObject = (name: string, Component: FC): RouteObject => {
  const propertiesArray = mockComponentProperties[`mock${name}PropertiesArray`]
  if (!propertiesArray)
    return {
      path: name,
      element: <Component />,
    }

  return {
    path: name,
    element: pipe(
      propertiesArray,
      Amap((properties) => <Component {...properties} />),
    ),
  }
}

const m1: Magma<ComponentModuleImports> = {
  concat: (x: ComponentModuleImports) => x,
}

const m2: Magma<FC> = {
  concat: (x: FC) => x,
}
const collector = (_: string, a: ComponentModuleImports) => a

const routes = pipe(
  Runion(m1)(componentRoutes)(errorComponentRoutes), // Combines component file paths and error component routes into a single record.
  Rcollect(SOrd)(collector), //  Gets an array of each file's import object.
  Areduce({}, (accumulator, next) => Runion(m2)(accumulator)(next)), // Combines all imported components into a single object.
  Rcollect(SOrd)(mapToRouteObject), // Takes the object and turns it into Array<RouteObject>.
)

export { routes }
