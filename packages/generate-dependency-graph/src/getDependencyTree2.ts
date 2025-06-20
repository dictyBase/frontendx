import { pipe } from "fp-ts/function"
import {
  has as Rhas,
  mapWithIndex as RmapWithIndex,
  filterWithIndex as RfilterWithIndex,
} from "fp-ts/Record"
import { ProjectManifest } from "./types"
import { ProjectNode } from "./ProjectNode"

declare global {
  var localOnly: boolean
}

const getDependencyTree2 = (
  manifest: ProjectManifest,
  localPackages: Record<string, ProjectManifest>,
  parent: ProjectNode | null = null
): ProjectNode => {
  const node = new ProjectNode({ name: manifest.name, version: manifest.version, parent })
  let dependencies: {[k: string]: string} = manifest.dependencies

  if (globalThis.localOnly) dependencies = pipe(dependencies, RfilterWithIndex((name) => Rhas(name, localPackages)))

  pipe(
    dependencies,
    RmapWithIndex((name, version) => {
      if (Rhas(name, localPackages)) {
        node.addChild(getDependencyTree2(localPackages[name]!, localPackages, node))
        return
      }
      node.addChild(new ProjectNode({ name, version, parent: node }))
    }),
  )
  return node 
}

export { getDependencyTree2 }
