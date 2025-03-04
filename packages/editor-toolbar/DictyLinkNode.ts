import { NodeKey } from "lexical"
import { LinkNode, LinkAttributes } from "@lexical/link"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  flatMap as OflatMap,
  match as Omatch,
} from "fp-ts/Option"

type DictyLinkAttributes = LinkAttributes & {
  download?: null | string
}

class DictyLinkNode extends LinkNode {
  __download: string

  constructor(url: string, attributes?: DictyLinkAttributes, key?: NodeKey) {
    super(url, attributes, key)
    const filename = pipe(
      attributes,
      OfromNullable,
      OflatMap(({ download }) => OfromNullable(download)),
      Omatch(() =>  "", (f) => f)
    )
    this.__download = filename
  }
}

export { DictyLinkNode }
