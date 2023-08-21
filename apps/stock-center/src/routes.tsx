import { type FunctionComponent } from "react"
import { ACCESS } from "./types"

type PageImport = {
  default: FunctionComponent
  access: ACCESS
}

const parsePath = (path: string) =>
  path
    .replaceAll(/\/src\/pages\/|\/index|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+]/, "*")
    .replaceAll(/\[([^/]+)]/g, ":$1")

const pages: Record<string, PageImport> = import.meta.glob(
  "/src/pages/**/**/*.tsx",
  {
    eager: true,
  },
)

const routes = Object.keys(pages).map((route) => ({
  path: parsePath(route),
  component: pages[route].default,
  access: pages[route].access,
}))

export { routes }
