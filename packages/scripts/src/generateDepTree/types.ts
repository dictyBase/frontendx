type ProjectManifest = {
  name: string
  version: string
  dependencies: { [k: string]: string }
  devDependencies: { [k: string]: string }
}

type DependencyNode = {
  name: string
  version: string
  dependencies: Array<DependencyNode>
}

export { ProjectManifest, DependencyNode }
