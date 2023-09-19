import { type FunctionComponent } from "react"
import { ACCESS } from "./types"

type PageImport = {
  default: FunctionComponent
  access: ACCESS
}

const parsePath = (path: string) =>
  path
    .replace(/^(?:\/src\/pages\/index\.tsx)$/, "/")
    .replace(/\[\.{3}.+]/, "*")
.replace(/\[(.+)\]/, ':$1')

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
