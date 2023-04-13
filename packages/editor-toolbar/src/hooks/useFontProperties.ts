import { useSetAtom } from "jotai"
import { useCallback } from "react"
import { $getSelection, $isRangeSelection } from "lexical"
import { $getSelectionStyleValueForProperty } from "@lexical/selection"
import {
  isBoldAtom,
  isItalicAtom,
  isUnderlinedAtom,
  fontSizeAtom,
  fontFamilyAtom,
  FontFamily,
} from "../context/atomConfigs"

const useFontProperties = () => {
  const setIsBold = useSetAtom(isBoldAtom)
  const setIsItalic = useSetAtom(isItalicAtom)
  const setIsUnderlined = useSetAtom(isUnderlinedAtom)
  const setFontSize = useSetAtom(fontSizeAtom)
  const setFontFamily = useSetAtom(fontFamilyAtom)
  return useCallback(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    setIsBold(selection.hasFormat("bold"))
    setIsItalic(selection.hasFormat("italic"))
    setIsUnderlined(selection.hasFormat("underline"))
    setFontSize(
      $getSelectionStyleValueForProperty(selection, "font-size", "15px"),
    )
    setFontFamily(
      $getSelectionStyleValueForProperty(
        selection,
        "font-family",
        "Arial",
      ) as FontFamily,
    )
  }, [setIsBold, setIsItalic, setIsUnderlined, setFontSize, setFontFamily])
}

export default useFontProperties
