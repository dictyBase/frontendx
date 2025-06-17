interface ITreeNode {
  parent: ITreeNode | null
  children: Array<ITreeNode>

  getParent(): ITreeNode | null
  addChild(child: ITreeNode): void
}

interface TreeNodeConstructorParameters {
  parent: ITreeNode | null
}

class TreeNode implements ITreeNode {
  parent: TreeNode | null

  children: Array<TreeNode>

  constructor({ parent }: TreeNodeConstructorParameters) {
    this.parent = parent
    this.children = []
  }

  getParent(): TreeNode | null {
    return this.parent
  }

  addChild(child: TreeNode) {
    this.children.push(child)
  }
}

export { TreeNode }
