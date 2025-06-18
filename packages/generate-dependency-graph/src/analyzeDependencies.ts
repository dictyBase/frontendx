import { join } from "node:path"
import { getManifest, getManifests } from "./getLocalPackages"
import { getDependencyTree } from "./getDependencyTree"

const analyzeDependencies = (appPath: string) => {
  const appManifest = getManifest(appPath)
  const packagesDirectory = join(appPath, "..", "packages") 
  const packageManifests = getManifests(packagesDirectory)
  return getDependencyTree(appManifest, packageManifests)
}

export { analyzeDependencies }
