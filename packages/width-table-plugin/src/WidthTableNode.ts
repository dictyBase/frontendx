import { TableNode, SerializedTableNode } from "@lexical/table"
import { addClassNamesToElement } from "@lexical/utils"
import { NodeKey, EditorConfig } from "lexical"

export interface SerializedWidthTableNode extends SerializedTableNode {
  width: number
}

/*
Note about double underscore naming from Lexical's documentation:

"By convention, we prefix properties with __ (double underscore) so that it makes it clear that these
properties are private and their access should be avoided directly. We opted for __ instead of _
because of the fact that some build tooling mangles and minifies single _ prefixed properties to improve
code size. However, this breaks down if you're exposing a node to be extended outside of your build."
https://lexical.dev/docs/concepts/nodes#node-properties
*/
class WidthTableNode extends TableNode {
  __width

  static override getType() {
    return "table"
  }

  static override clone(node: WidthTableNode): WidthTableNode {
    return new WidthTableNode(node.__width, node.__key)
  }

  static override importJSON(serializedNode: SerializedWidthTableNode) {
    return new WidthTableNode(serializedNode.width)
  }

  constructor(width: number, key?: NodeKey) {
    super(key)
    this.__width = width
  }

  override exportJSON() {
    return {
      ...super.exportJSON(),
      width: this.__width,
    }
  }

  override createDOM(config: EditorConfig) {
    const tableElement = document.createElement("table")
    addClassNamesToElement(tableElement, config.theme.table)
    tableElement.style.width = `${this.__width}px`
    return tableElement
  }
}

export default WidthTableNode
