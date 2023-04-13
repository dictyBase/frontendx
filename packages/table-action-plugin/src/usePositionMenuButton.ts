import { useEffect, useRef } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai"
import { selectedTableCellNode } from "./atomConfigs"

const usePositionMenuButton = () => {
  const tableCellNode = useAtomValue(selectedTableCellNode)
  const [editor] = useLexicalComposerContext()
  const menuButtonReference = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!tableCellNode) return

    const tableCellAnchorElement = editor.getElementByKey(
      tableCellNode.getKey(),
    )
    if (!tableCellAnchorElement) return

    const menuButtonDOM = menuButtonReference.current
    if (!menuButtonDOM) return

    const menuButtonRectangle = menuButtonDOM.getBoundingClientRect()
    const anchorElementRectangle =
      tableCellAnchorElement.getBoundingClientRect()

    menuButtonDOM.style.left = `${
      anchorElementRectangle.right - menuButtonRectangle.width + window.scrollX
    }px`
    menuButtonDOM.style.top = `${
      anchorElementRectangle.top +
      10 -
      menuButtonRectangle.height / 2 +
      window.scrollY
    }px`
  }, [tableCellNode, editor, menuButtonReference])

  return menuButtonReference
}

export default usePositionMenuButton
