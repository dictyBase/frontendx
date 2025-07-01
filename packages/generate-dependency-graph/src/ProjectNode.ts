import { TreeNode } from "./TreeNode"

class ProjectNode extends TreeNode {
  parent: ProjectNode | null

  name: string

  version: string

  children: Array<ProjectNode> = []

  constructor({
    name,
    version,
    parent = null,
  }: {
    name: string
    version: string
    parent?: ProjectNode["parent"]
  }) {
    super({ parent })
    this.parent = parent
    this.name = name
    this.version = version
  }

  getParent(): ProjectNode | null {
    return this.parent
  }

  addChild(child: ProjectNode) {
    this.children.push(child)
  }

  removeChild(child: ProjectNode) {
    const index = this.children.indexOf(child)
    if (index > -1) {
      this.children.splice(index, 1)
    }
  }

  hasChild(dependencyName: string): boolean {
    return this.children.some(child => child.name === dependencyName)
  }

  findChild(dependencyName: string): ProjectNode | undefined {
    return this.children.find(child => child.name === dependencyName)
  }

  getAllDescendantDependencies(): Set<string> {
    const dependencies = new Set<string>()
    
    const traverse = (node: ProjectNode) => {
      for (const child of node.children) {
        dependencies.add(child.name)
        traverse(child)
      }
    }
    
    traverse(this)
    return dependencies
  }
}

export { ProjectNode }
