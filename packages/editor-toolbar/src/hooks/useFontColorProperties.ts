import { useCallback } from "react"
import { useSetAtom } from "jotai"
import { $getSelection, $isRangeSelection } from "lexical"
import { $getSelectionStyleValueForProperty } from "@lexical/selection"
import { fontColorAtom } from "../context/atomConfigs"

const useTextColorProperties = () => {
  const setTextColor = useSetAtom(fontColorAtom)

  return useCallback(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    setTextColor(
      $getSelectionStyleValueForProperty(selection, "color", "#000000"),
    )
  }, [setTextColor])
}

export default useTextColorProperties
