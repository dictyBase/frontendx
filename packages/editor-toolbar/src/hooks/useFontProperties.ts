import { useSetAtom } from "jotai"
import { useCallback } from "react"
import { $getSelection, $isRangeSelection } from "lexical"
import { $getSelectionStyleValueForProperty } from "@lexical/selection"
import { pipe } from "fp-ts/function"
import { findFirst as RAfindFirst } from "fp-ts/ReadonlyArray"
import { match as Omatch } from "fp-ts/Option"
import {
  isBoldAtom,
  isItalicAtom,
  isUnderlinedAtom,
  fontSizeAtom,
  fontFamilyAtom,
  fontFamilyOptions,
  defaultFont,
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
    const selectedFontValue = $getSelectionStyleValueForProperty(
      selection,
      "font-family",
    )
    pipe(
      fontFamilyOptions,
      RAfindFirst((fontOption) => fontOption.value === selectedFontValue),
      Omatch(
        () => {
          setFontFamily(defaultFont)
        },
        (selected) => {
          setFontFamily(selected)
        },
      ),
    )
  }, [setIsBold, setIsItalic, setIsUnderlined, setFontSize, setFontFamily])
}

export { useFontProperties }
