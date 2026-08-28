/* eslint-disable class-methods-use-this */
import {
  DecoratorNode,
  EditorConfig,
  Spread,
  SerializedLexicalNode,
  LexicalNode,
} from "lexical"
import { ImageStateWrapper } from "./ImageStateWrapper"

enum ALIGNMENT {
  LEFT,
  CENTER,
  RIGHT,
}

type SerializedImageNode = Spread<
  {
    source: string
    width: number
    height: number
    alt?: string | undefined
    type: "image"
    alignment: ALIGNMENT
  },
  SerializedLexicalNode
>

type ImageNodeConstructorProperties = {
  source: string
  width: number
  height: number
  alt?: string | undefined
  key?: string
  alignment: ALIGNMENT
}

class ImageNode extends DecoratorNode<JSX.Element> {
  __source

  __alt

  __height

  __width

  __alignment

  static override getType() {
    return "image"
  }

  static override clone(node: ImageNode) {
    const {
      __source: source,
      __alt: alt,
      __key: key,
      __width: width,
      __height: height,
      __alignment: alignment,
    } = node
    return new ImageNode({
      source,
      alt,
      key,
      width,
      height,
      alignment,
    })
  }

  static override importJSON({
    source,
    alt,
    width,
    height,
    alignment,
  }: SerializedImageNode): ImageNode {
    return new ImageNode({
      source,
      alt,
      width,
      height,
      alignment,
    })
  }

  constructor({
    source,
    width,
    height,
    alt,
    key,
    alignment,
  }: ImageNodeConstructorProperties) {
    super(key)
    this.__source = source
    this.__height = height
    this.__width = width
    this.__alt = alt
    this.__alignment = alignment
  }

  override isInline() {
    return false
  }

  setDimensions(width: number, height: number) {
    const writable = this.getWritable()
    writable.__width = width
    writable.__height = height
  }

  setAlignment(value: ALIGNMENT) {
    const writable = this.getWritable()
    writable.__alignment = value
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

  override exportJSON(): SerializedImageNode {
    return {
      type: "image",
      source: this.__source,
      width: this.__width,
      height: this.__height,
      alt: this.__alt,
      alignment: this.__alignment,
      version: 1,
    }
  }

  override decorate() {
    return (
      <ImageStateWrapper
        nodeKey={this.__key}
        src={this.__source}
        alt={this.__alt}
        initialWidth={this.__width}
        initialHeight={this.__height}
        initialAlignment={this.__alignment}
        fit="fill"
        easing="cubic-bezier(0.7, 0, 0.6, 1)"
        duration={2000}
      />
    )
  }
}

const $isImageNode = (node: LexicalNode): node is ImageNode =>
  node.getType() === "image"

export { type SerializedImageNode, ImageNode, $isImageNode, ALIGNMENT }
