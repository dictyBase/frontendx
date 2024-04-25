/* eslint-disable class-methods-use-this */
import {
  EditorConfig,
  ElementNode,
  LexicalNode,
  $createParagraphNode,
  $isParagraphNode,
  ParagraphNode,
} from "lexical"

const nodeTypeName = "flex-layout"

class FlexLayoutNode extends ElementNode {
  static override getType() {
    return nodeTypeName
  }

  static override clone(node: FlexLayoutNode) {
    const { __key } = node
    return new FlexLayoutNode(__key)
  }

  override canBeEmpty() {
    return false
  }

  static override importJSON() {
    return new FlexLayoutNode()
  }

  override exportJSON() {
    return {
      ...super.exportJSON(),
      type: nodeTypeName,
    }
  }

  override updateDOM() {
    return false
  }

  getParagraphNodeOrThrow() {
    const paragraphNode = this.getChildren().find((node) =>
      $isParagraphNode(node),
    )
    if (!paragraphNode) throw new Error("FlexLayoutNode has no ParagraphNode")
    return paragraphNode as ParagraphNode
  }

  override createDOM(config: EditorConfig) {
    const div = document.createElement("div")
    div.style.display = "flex"
    div.style.columnGap = "10px"
    const { theme } = config
    // eslint-disable-next-line dot-notation
    const className = theme["flexLayout"]
    if (className) {
      div.className = className
    }
    return div
  }
}

export const $isFlexLayoutNode = (node: LexicalNode): node is FlexLayoutNode =>
  node.getType() === nodeTypeName

const $createFlexLayoutNode = () => {
  const paragraphNode = $createParagraphNode()
  const flexLayoutNode = new FlexLayoutNode()
  flexLayoutNode.append(paragraphNode)
  return flexLayoutNode
}

export { FlexLayoutNode, $createFlexLayoutNode }
