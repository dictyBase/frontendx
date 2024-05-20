import { useCallback } from "react"
import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical"
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list"
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text"
import { $wrapNodes } from "@lexical/selection"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai"
import { $createFlexLayoutNode } from "@dictybase/flex-layout-plugin"
import { blockTypeAtom, BlockTypes } from "../context/atomConfigs"

const formatParagraph = (
  currentBlockType: BlockTypes,
  editor: LexicalEditor,
) => {
  if (currentBlockType !== "flex-layout") {
    editor.update(() => {
      const selection = $getSelection()

      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createFlexLayoutNode())
      }
    })
  }
}

const formatHeading = (
  headingSize: HeadingTagType,
  currentBlockType: BlockTypes,
  editor: LexicalEditor,
) => {
  if (currentBlockType !== headingSize) {
    editor.update(() => {
      const selection = $getSelection()

      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createHeadingNode(headingSize))
      }
    })
  }
}

const formatQuote = (currentBlockType: BlockTypes, editor: LexicalEditor) => {
  if (currentBlockType !== "quote") {
    editor.update(() => {
      const selection = $getSelection()

      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createQuoteNode())
      }
    })
  }
}

const formatBulletList = (
  currentBlockType: BlockTypes,
  editor: LexicalEditor,
) => {
  if (currentBlockType === "bullet") {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
  } else {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
  }
}

const formatNumberedList = (
  currentBlockType: BlockTypes,
  editor: LexicalEditor,
) => {
  if (currentBlockType === "number") {
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
  } else {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
  }
}

const useBlockFormat = (): [BlockTypes, (newBlockType: BlockTypes) => void] => {
  const [editor] = useLexicalComposerContext()
  const blockType = useAtomValue(blockTypeAtom)

  const setBlockType = useCallback(
    (newBlockType: BlockTypes) => {
      const blockFormatFunctions = {
        "flex-layout": () => formatParagraph(blockType, editor),
        h1: () => formatHeading("h1", blockType, editor),
        h2: () => formatHeading("h2", blockType, editor),
        h3: () => formatHeading("h3", blockType, editor),
        h4: () => formatHeading("h4", blockType, editor),
        bullet: () => formatBulletList(blockType, editor),
        number: () => formatNumberedList(blockType, editor),
        quote: () => formatQuote(blockType, editor),
      }
      blockFormatFunctions[newBlockType]()
    },
    [blockType, editor],
  )

  return [blockType, setBlockType]
}

export { useBlockFormat }
