interface ITreeNode {
  parent: ITreeNode | null
  children: Array<TreeNode>

  getParent(): ITreeNode | null
  addChild(child: ITreeNode): void
}

interface TreeNodeConstructorParameters {
  parent: ITreeNode | null
}

class TreeNode implements ITreeNode {
  parent: ITreeNode | null
  children: Array<TreeNode>

  constructor({ parent }: TreeNodeConstructorParameters) {
    this.parent = parent
    this.children = []
  }

  getParent(): ITreeNode | null {
    return this.parent
  }

  addChild(child: ITreeNode) {
    this.children.push(child)
  }
}

class PackageNode extends TreeNode {
  parent: PackageNode | null
  name: string
  version: string

  constructor({
    name,
    version,
    parent = null,
  }: {
    name: string
    version: string
    parent?: PackageNode["parent"]
  }) {
    super({ parent })
    this.parent = parent
    this.name = name
    this.version = version
  }

  getParent(): PackageNode | null {
    return this.parent
  }

  addChild(child: PackageNode) {
    this.children.push(child)
  }
}
