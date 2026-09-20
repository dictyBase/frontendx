import { useEffect, useRef } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai"
import { selectedTableCellNodeKey } from "./atomConfigs"

const usePositionMenuButton = () => {
  const tableCellNodeKey = useAtomValue(selectedTableCellNodeKey)
  const [editor] = useLexicalComposerContext()
  const menuButtonReference = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!tableCellNodeKey) return

    const tableCellAnchorElement = editor.getElementByKey(tableCellNodeKey)
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
  }, [tableCellNodeKey, editor, menuButtonReference])

  return menuButtonReference
}

export { usePositionMenuButton }
