import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { getManifests } from "./getLocalPackages"
import { getDependencyTree } from "./getDependencyTree"
import { ProjectManifest } from "./types"

const ROOT_DIR = process.cwd()
const PACKAGES_DIRECTORY = join(ROOT_DIR, "packages")
const APPS_DIRECTORY = join(ROOT_DIR, "apps")

const curriedGetDependencyTree =
  (packages: { [key: string]: ProjectManifest }) => (apps: ProjectManifest) =>
    getDependencyTree(apps, packages)

const main = () => {
  const apps = getManifests(APPS_DIRECTORY)
  const packages = getManifests(PACKAGES_DIRECTORY)
  const jsonOutput = join(ROOT_DIR, "dependency-graph.json")
  const graph = getDependencyTree(apps["dicty-frontpage"], packages)
  writeFileSync(jsonOutput, JSON.stringify(graph, null, 2))
}

main()
