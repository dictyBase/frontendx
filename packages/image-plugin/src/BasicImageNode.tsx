/* eslint-disable class-methods-use-this */
import {
  DecoratorNode,
  EditorConfig,
  Spread,
  SerializedLexicalNode,
  LexicalNode,
} from "lexical"
import { BasicImageComponent } from "./BasicImageComponent"

type SerializedBasicImageNode = Spread<
  {
    source: string
    type: "image"
  },
  SerializedLexicalNode
>

type BasicImageNodeConstructorProperties = {
  source: string
  key?: string
}

class BasicImageNode extends DecoratorNode<JSX.Element> {
  __source

  static override getType() {
    return "image"
  }

  static override clone(node: BasicImageNode) {
    const { __source: source, __key: key } = node
    return new BasicImageNode({
      source,
      key,
    })
  }

  static override importJSON({
    source,
  }: SerializedBasicImageNode): BasicImageNode {
    return new BasicImageNode({
      source,
    })
  }

  constructor({ source, key }: BasicImageNodeConstructorProperties) {
    super(key)
    this.__source = source
  }

  override createDOM(config: EditorConfig) {
    const div = document.createElement("div")
    const { theme } = config
    const className = theme.image
    if (className) {
      div.className = className
    }
    return div
  }

  override updateDOM() {
    return false
  }

  override exportJSON(): SerializedBasicImageNode {
    return {
      type: "image",
      source: this.__source,
      version: 1,
    }
  }

  override decorate() {
    return <BasicImageComponent src={this.__source} />
  }
}

const $isBasicImageNode = (node: LexicalNode): node is BasicImageNode =>
  node.getType() === "image"

export { type SerializedBasicImageNode, BasicImageNode, $isBasicImageNode }
