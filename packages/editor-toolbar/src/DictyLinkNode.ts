import { EditorConfig, NodeKey } from "lexical"
import { LinkNode, LinkAttributes, SerializedLinkNode } from "@lexical/link"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  fromNullable as OfromNullable,
  flatMap as OflatMap,
  match as Omatch,
} from "fp-ts/Option"

type DictyLinkAttributes = LinkAttributes & {
  download?: null | string
}

class DictyLinkNode extends LinkNode {
  __download: null | string

  constructor(url: string, attributes?: DictyLinkAttributes, key?: NodeKey) {
    super(url, attributes, key)
    const filename = pipe(
      attributes,
      OfromNullable,
      OflatMap(({ download }) => OfromNullable(download)),
      Omatch(
        () => null,
        (f) => f,
      ),
    )
    this.__download = filename
  }

  setDownload(filename: string) {
    const self = this.getWritable()
    self.__download = filename
  }

  getDownload() {
    const self = this.getLatest()
    return self.__download
  }

  static override clone(node: DictyLinkNode) {
    const cloneAttributes = {
      rel: node.__rel,
      target: node.__target,
      title: node.__title,
      download: node.__download,
    }
    return new DictyLinkNode(node.__url, cloneAttributes, node.__key)
  }

  override createDOM(config: EditorConfig) {
    const element = super.createDOM(config)
    pipe(
      this.__download,
      OfromNullable,
      Omatch(
        () => {},
        (download) => (element.download = download),
      ),
    )
    return element
  }
  override updateDOM(
    previousNode: DictyLinkNode,
    anchor: HTMLAnchorElement,
    config: EditorConfig,
  ) {
    const isUpdated = super.updateDOM(previousNode, anchor, config)
    // If new value and previous value of download are the same, do nothing.
    // If the new value is null, remove the attribute.
    // Otherwise, the new value is non-null and different, so set the anchor's download attribute to the new value.
    pipe(
      this.__download !== previousNode.__download,
      Bmatch(
        () => {},
        () => {
          pipe(
            this.__download,
            OfromNullable,
            Omatch(
              () => {
                anchor.removeAttribute("download")
              },
              (nextDownloadValue) => {
                anchor.download === nextDownloadValue
              },
            ),
          )
        },
      ),
    )
    return isUpdated
  }
  //override importJSON(serializedNode: ) {}
}

export { DictyLinkNode }
