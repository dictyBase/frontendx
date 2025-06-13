import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { fromEntries as RfromEntries } from "fp-ts/Record"
import { ProjectManifest } from "./types"

const getManifest = (projectDirectory: string): ProjectManifest => {
  const manifestFilePath = join(projectDirectory, "package.json")
  const manifestFile = readFileSync(manifestFilePath, "utf8")
  return JSON.parse(manifestFile)
}

/*
 * Returns a Set of the names of local packages.
 *
 * 1. Get the packages directory
 * 2. Read the name of each package from their `package.json`
 * 3. Append it to the list
 */
const getManifests = (directory: string) => {
  const projects = readdirSync(directory)
  return pipe(
    projects,
    Amap((project) => join(directory, project)),
    Amap(getManifest),
    Amap((manifest) => [manifest.name, manifest] as [string, ProjectManifest]),
    RfromEntries,
  )
}

export { getManifest, getManifests }
