import { pipe } from "fp-ts/function"
import { Ord as SOrd } from "fp-ts/string"
import {
  collect as Rcollect,
  has as Rhas,
  mapWithIndex as RmapWithIndex,
} from "fp-ts/Record"
import { ProjectManifest, DependencyNode } from "./types"

const getDependencyTree = (
  manifest: ProjectManifest,
  localPackages: Record<string, ProjectManifest>,
): DependencyNode => {
  const dependencies = pipe(
    manifest.dependencies,
    RmapWithIndex((name, version) => {
      if (Rhas(name, localPackages)) {
        return getDependencyTree(localPackages[name], localPackages)
      }
      return {
        name,
        version,
        dependencies: [],
      }
    }),
    Rcollect(SOrd)((_, nodes) => nodes),
  )

  return {
    name: manifest.name,
    version: manifest.version,
    dependencies,
  }
}

export { getDependencyTree }
