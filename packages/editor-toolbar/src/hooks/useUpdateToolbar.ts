import { useCallback } from "react"
import useFontProperties from "./useFontProperties"
import useFontColorProperties from "./useFontColorProperties"
import useBlockTypeProperties from "./useBlockTypeProperties"

const useUpdateToolbar = () => {
  const updateFontProperties = useFontProperties()
  const updateTextColorProperties = useFontColorProperties()
  const updateBlockTypeProperties = useBlockTypeProperties()

  return useCallback(() => {
    updateFontProperties()
    updateTextColorProperties()
    updateBlockTypeProperties()
  }, [
    updateBlockTypeProperties,
    updateFontProperties,
    updateTextColorProperties,
  ])
}

export default useUpdateToolbar
