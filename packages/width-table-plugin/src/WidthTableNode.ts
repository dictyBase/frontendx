import { TableNode, SerializedTableNode } from "@lexical/table"
import { addClassNamesToElement } from "@lexical/utils"
import { NodeKey, EditorConfig } from "lexical"

export interface SerializedWidthTableNode extends SerializedTableNode {
  width: number
}

class WidthTableNode extends TableNode {
  /** @private */
  __width

  /**
   * Returns the node type
   *
   * @static
   */
  static override getType() {
    return "table"
  }

  /**
   * Returns a new instance of WidthTableNode with the same width and optional key as the input node.
   *
   * @static
   * @param node - The node to clone.
   */
  static override clone({ __width, __key }: WidthTableNode): WidthTableNode {
    return new WidthTableNode(__width, __key)
  }

  /**
   * Creates a new instance of WidthTableNode from the serialized data.
   *
   * @static
   * @param serializedNode - Serialized data of the node.
   */
  static override importJSON(serializedNode: SerializedWidthTableNode) {
    return new WidthTableNode(serializedNode.width)
  }

  /**
   * Creates a new instance of WidthTableNode with the specified width and optional key.
   *
   * @param  width - The width of the table.
   * @param  key -  key for the node.
   */
  constructor(width: number, key?: NodeKey) {
    super(key)
    this.__width = width
  }

  /**
   * Returns a serialized version of the WidthTableNode, including its key and width.
   *
   * @override
   */
  override exportJSON() {
    return {
      ...super.exportJSON(),
      width: this.__width,
    }
  }

  /**
   * Creates and returns a new HTML table element with the appropriate width and CSS classes.
   *
   * @override
   * @param config - The configuration of the editor.
   */
  override createDOM(config: EditorConfig) {
    const tableElement = document.createElement("table")
    addClassNamesToElement(tableElement, config.theme.table)
    tableElement.style.width = `${this.__width}px`
    return tableElement
  }
}

export default WidthTableNode
