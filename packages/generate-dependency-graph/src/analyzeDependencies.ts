import { join } from "node:path"
import { getManifest, getManifests } from "./getLocalPackages"
import { getDependencyTree2 } from "./getDependencyTree2"

const analyzeDependencies = (appPath: string) => {
  const appManifest = getManifest(appPath)
  const packagesDirectory = join(appPath, "..", "..", "packages") 
  const packageManifests = getManifests(packagesDirectory)
  return getDependencyTree2(appManifest, packageManifests)
}

export { analyzeDependencies }
