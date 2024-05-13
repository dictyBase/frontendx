import { useSetAtom } from "jotai"
import { useCallback } from "react"
import { $isLinkNode } from "@lexical/link"
import { $getSelection, $isRangeSelection, $isTextNode, LexicalNode } from "lexical"
import { pipe } from "fp-ts/function"
import { map as Amap, reduce as Areduce, filter as Afilter } from "fp-ts/Array"
import { MonoidAny } from "fp-ts/boolean"
import {
  isLinkAtom,
} from "../context/atomConfigs"

const hasLinkNodeParent = (node: LexicalNode) => {
  return pipe(
    node.getParents(),
    Amap((parent) => $isLinkNode(parent)),
    Areduce(false, MonoidAny.concat)
  )
}

const useLinkProperties = () => {
  const setIsLink = useSetAtom(isLinkAtom)
  return useCallback(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    const isLink = pipe(
      selection.getNodes(),
      Afilter($isTextNode),
      Amap((node) => hasLinkNodeParent(node)),
      Areduce(false, MonoidAny.concat)
    )
    setIsLink(isLink)
  }, [setIsLink])
}

export { useLinkProperties }
