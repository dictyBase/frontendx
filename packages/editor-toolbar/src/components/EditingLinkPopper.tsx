import { useState, useEffect } from "react"
import { Popper, TextField } from "@material-ui/core"
import { $getSelection } from "lexical"
import { useAtomValue } from "jotai"
import { $isLinkNode, LinkNode } from "@lexical/link"
import {
  TextNode,
  $isRangeSelection,
  $isTextNode,
  LexicalEditor,
} from "lexical"
import {
  head as Ahead,
  reduce as Areduce,
  map as Amap,
  filter as Afilter,
} from "fp-ts/Array"
import {
  fromNullable as OfromNullable,
  toNullable as OtoNullable,
  getOrElse as OgetOrElse,
  bindTo as ObindTo,
  bind as Obind,
  let as Olet,
  Do as ODo,
  map as Omap,
  none,
} from "fp-ts/Option"
import { MonoidAll } from "fp-ts/boolean"
import { pipe } from "fp-ts/function"
import { isLinkAtom } from "../context/atomConfigs"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

const getAnchorElement = (editor: LexicalEditor) => {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return none
  return pipe(
    ODo,
    Obind("textNode", () =>
      pipe(selection.getNodes(), Afilter($isTextNode), Ahead),
    ),
    Obind("linkNode", ({ textNode }) =>
      pipe(textNode.getParents(), Afilter($isLinkNode), Ahead),
    ),
    Obind("anchorElement", ({ linkNode }) =>
      OfromNullable(linkNode.exportDOM(editor).element),
    ),
    Omap(({ anchorElement }) => anchorElement),
  )
}

const EditingLinkPopper = () => {
  const [editor] = useLexicalComposerContext()
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const isLink = useAtomValue(isLinkAtom)
  const isOpen = MonoidAll.concat(isLink as boolean, editor.isEditable())
// anchorElement needs to be set before open
  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        setAnchorElement(pipe(editor, getAnchorElement, OtoNullable))
      })
    })
  }, [editor, setAnchorElement])

    console.log(anchorElement)
  return (
    <Popper id="#test" anchorEl={anchorElement} open={isOpen}>
      <TextField />
    </Popper>
  )
}

export { EditingLinkPopper }
