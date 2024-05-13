import { useCallback } from "react"
import { useFontProperties } from "./useFontProperties"
import { useFontColorProperties } from "./useFontColorProperties"
import { useBlockTypeProperties } from "./useBlockTypeProperties"
import { useLinkProperties } from "./useLinkProperties"

const useUpdateToolbar = () => {
  const updateFontProperties = useFontProperties()
  const updateTextColorProperties = useFontColorProperties()
  const updateBlockTypeProperties = useBlockTypeProperties()
  const updateLinkProperties = useLinkProperties() 

  return useCallback(() => {
    updateFontProperties()
    updateTextColorProperties()
    updateBlockTypeProperties()
    updateLinkProperties()
  }, [
    updateBlockTypeProperties,
    updateFontProperties,
    updateTextColorProperties,
    updateLinkProperties,
  ])
}

export { useUpdateToolbar }
