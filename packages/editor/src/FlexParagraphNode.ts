import {
  EditorConfig,
  ParagraphNode,
} from "lexical"

const nodeTypeName = "flex-paragraph"

class FlexParagraphNode extends ParagraphNode {
  static override getType() {
    return nodeTypeName
  }

  static override clone(node: FlexParagraphNode) {
    const { __key } = node
    return new FlexParagraphNode(__key)
  }

//  override canBeEmpty() {
//    return false
//  }
//
//  static override importJSON() {
//    return new FlexParagraphNode()
//  }
//
//  override exportJSON() {
//    return {
//      ...super.exportJSON(),
//      type: nodeTypeName,
//    }
//  }
//
//  override updateDOM() {
//    return false
//  }

  override createDOM(config: EditorConfig) {
    const dom = super.createDOM(config)
    // const flexContainer = document.createElement("div")
    dom.style.display = "flex"  
    dom.style.width = "100%"
    dom.style.justifyContent = "center"
    // flexContainer.appendChild(dom)
    //
    return dom
  }
}

export { FlexParagraphNode }
