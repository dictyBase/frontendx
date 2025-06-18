import { pipe } from "fp-ts/function"
import {
  has as Rhas,
  mapWithIndex as RmapWithIndex,
} from "fp-ts/Record"
import { ProjectManifest } from "./types"
import { ProjectNode } from "./ProjectNode"

const getDependencyTree2 = (
  manifest: ProjectManifest,
  localPackages: Record<string, ProjectManifest>,
  parent: ProjectNode | null = null
): ProjectNode => {
  const node = new ProjectNode({ name: manifest.name, version: manifest.version, parent })
  pipe(
    manifest.dependencies,
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
