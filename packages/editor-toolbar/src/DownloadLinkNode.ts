import { EditorConfig, NodeKey } from "lexical"
import { LinkNode, LinkAttributes, SerializedLinkNode } from "@lexical/link"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  fromNullable as OfromNullable,
  flatMap as OflatMap,
  match as Omatch,
} from "fp-ts/Option"

type DownloadLinkAttributes = LinkAttributes & {
  download?: null | string
}

type SerializedDownloadLinkNode = Required<SerializedLinkNode> & {
  download: null | string
}

const downloadFromAPI = (filename: string) => async (event: MouseEvent) => {
  event.preventDefault()
  const anchor = event.currentTarget as HTMLAnchorElement
  const response = await fetch(anchor.href)
  const blob = await response.blob()
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = objectUrl
  link.download = filename
  link.click()
  URL.revokeObjectURL(objectUrl)
}

class DownloadLinkNode extends LinkNode {
  __download: null | string

  constructor(url: string, attributes?: DownloadLinkAttributes, key?: NodeKey) {
    super(url, attributes, key)
    console.log("inserting download link node", attributes)
    const filename = pipe(
      attributes,
      OfromNullable,
      OflatMap(({ download }) => OfromNullable(download)),
      Omatch(
        // eslint-disable-next-line unicorn/no-null
        () => null,
        (f) => f,
      ),
    )
    this.__download = filename
  }

  static override getType() {
    return "download-link"
  }

  setDownload(filename: string) {
    const self = this.getWritable()
    self.__download = filename
  }

  getDownload() {
    const self = this.getLatest()
    return self.__download
  }

  static override clone(node: DownloadLinkNode) {
    const cloneAttributes = {
      rel: node.__rel,
      target: node.__target,
      title: node.__title,
      download: node.__download,
    }
    return new DownloadLinkNode(node.__url, cloneAttributes, node.__key)
  }

  override createDOM(config: EditorConfig) {
    const element = super.createDOM(config)
    pipe(
      this.__download,
      OfromNullable,
      Omatch(
        () => {},
        (download) => {
          element.download = download
          console.log("adding click listener?")
          element.addEventListener("click", downloadFromAPI(download))
        },
      ),
    )
    return element
  }

  override updateDOM(
    previousNode: DownloadLinkNode,
    anchor: HTMLAnchorElement,
    config: EditorConfig,
  ) {
    const isUpdated = super.updateDOM(previousNode, anchor, config)
    pipe(
      this.__download !== previousNode.__download,
      Bmatch(
        // If new value and previous value of download are the same, do nothing.
        () => {},
        () => {
          pipe(
            this.__download,
            OfromNullable,
            Omatch(
              () => {
                // If the new value is null, remove the attribute.
                anchor.removeAttribute("download")
              },
              // Otherwise, the new value is non-null and different, so set the anchor's download attribute to the new value.
              (nextDownloadValue) => {
                // eslint-disable-next-line no-param-reassign
                anchor.download = nextDownloadValue
                anchor.addEventListener(
                  "click",
                  downloadFromAPI(nextDownloadValue),
                )
              },
            ),
          )
        },
      ),
    )
    return isUpdated
  }

  override exportJSON() {
    return {
      ...super.exportJSON(),
      type: this.getType(),
      download: this.getDownload(),
    }
  }

  static override importJSON(serializedNode: SerializedDownloadLinkNode) {
    const node = new DownloadLinkNode(serializedNode.url, {
      rel: serializedNode.rel,
      target: serializedNode.target,
      title: serializedNode.title,
      download: serializedNode.download,
    })
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }
}

const $createDownloadLinkNode = (
  url: string,
  attributes: DownloadLinkAttributes,
) => new DownloadLinkNode(url, attributes)

export { DownloadLinkNode, $createDownloadLinkNode }
