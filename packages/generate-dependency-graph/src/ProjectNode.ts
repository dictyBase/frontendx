import { TreeNode } from "./TreeNode"

class ProjectNode extends TreeNode {
  parent: ProjectNode | null

  name: string

  version: string

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
}

export { ProjectNode }
