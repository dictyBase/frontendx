/* eslint-disable class-methods-use-this */
import {
  DecoratorNode,
  EditorConfig,
  Spread,
  SerializedLexicalNode,
  LexicalNode,
} from "lexical"
import ImageComponent from "./ImageComponent"

export type SerializedImageNode = Spread<
  {
    source: string
    width: number
    height: number
    fit?: string
    transition?: string
    duration?: number
    alt?: string
    type: "image"
  },
  SerializedLexicalNode
>

type ImageNodeConstructorProperties = {
  source: string
  width: number
  height: number
  fit?: string
  transition?: string
  duration?: number
  alt?: string
  key?: string
}

class ImageNode extends DecoratorNode<JSX.Element> {
  __source

  __height

  __width

  __fit

  __transition

  __duration

  __alt

  static override getType() {
    return "image"
  }

  static override clone(node: ImageNode) {
    const {
      __source,
      __alt,
      __key,
      __width,
      __height,
      __fit,
      __transition,
      __duration,
    } = node
    return new ImageNode({
      __source,
      __alt,
      __key,
      __width,
      __height,
      __fit,
      __transition,
      __duration,
    })
  }

  static override importJSON({
    source,
    alt,
    width,
    height,
    fit,
    transition,
    duration,
  }: SerializedImageNode): ImageNode {
    return new ImageNode({
      source,
      alt,
      width,
      height,
      fit,
      transition,
      duration,
    })
  }

  constructor({
    source,
    width,
    height,
    fit,
    transition,
    duration,
    alt,
    key,
  }: ImageNodeConstructorProperties) {
    super(key)
    this.__source = source
    this.__height = height
    this.__width = width
    this.__fit = fit
    this.__transition = transition
    this.__duration = duration
    this.__alt = alt
  }

  setDimensions(width: number, height: number) {
    const writable = this.getWritable()
    writable.__width = width
    writable.__height = height
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
      fit: this.__fit,
      transition: this.__transition,
      duration: this.__duration,
      alt: this.__alt,
      version: 1,
    }
  }

  override decorate() {
    return (
      <ImageComponent
        nodeKey={this.__key}
        src={this.__source}
        alt={this.__alt}
        initialWidth={this.__width}
        initialHeight={this.__height}
        fit="cover"
        easing="cubic-bezier(0.7, 0, 0.6, 1)"
        duration={2000}
      />
    )
  }
}

export const $isImageNode = (node: LexicalNode): node is ImageNode =>
  node.getType() === "image"

export default ImageNode
