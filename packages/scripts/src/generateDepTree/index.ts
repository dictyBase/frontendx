import { join } from "node:path"
import { getManifests } from "./getLocalPackages"
import { getDependencyTree } from "./getDependencyTree"

const PACKAGES_DIRECTORY = join(process.cwd(), "packages")
const APPS_DIRECTORY = join(process.cwd(), "apps")

const main = () => {
  const apps = getManifests(APPS_DIRECTORY)
  const packages = getManifests(PACKAGES_DIRECTORY)
  console.log(JSON.stringify(getDependencyTree(apps["dicty-frontpage"], packages)))
}

main()
