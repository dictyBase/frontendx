import { useCallback } from "react"
import { useSetAtom } from "jotai"
import {
  $getSelection,
  $isRangeSelection,
  TextNode,
  ElementNode,
} from "lexical"
import { $isHeadingNode } from "@lexical/rich-text"
import { $isListNode, ListNode } from "@lexical/list"
import { $getNearestNodeOfType } from "@lexical/utils"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { BlockTypes, blockTypeAtom } from "../context/atomConfigs"

const getElementFromAnchor = (anchorNode: TextNode | ElementNode) =>
  anchorNode.getKey() === "root"
    ? anchorNode
    : anchorNode.getTopLevelElementOrThrow()

const getParentList = (anchorNode: TextNode | ElementNode) =>
  $getNearestNodeOfType<ListNode>(anchorNode, ListNode)

const useBlockTypeProperties = () => {
  const setBlockType = useSetAtom(blockTypeAtom)
  const [editor] = useLexicalComposerContext()

  return useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      const element = getElementFromAnchor(anchorNode)
      const elementKey = element.getKey()
      const elementDOM = editor.getElementByKey(elementKey)

      if (elementDOM) {
        if ($isListNode(element)) {
          const parentList = getParentList(anchorNode)
          const type = parentList
            ? parentList.getListType()
            : element.getListType()
          setBlockType(type as BlockTypes)
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType()
          setBlockType(type as BlockTypes)
        }
      }
    }
  }, [editor, setBlockType])
}

export default useBlockTypeProperties
