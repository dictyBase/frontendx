import { Button } from "@mui/material"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useSetAtom } from "jotai"
import { fontColorAtom } from "../context/atomConfigs"
import { useColorOptionButtonStyles } from "../hooks/useColorOptionButtonStyles"
import { applyTextStyles } from "../utils/textStyles"

type ColorOptionButtonProperties = {
  color: string
}

const ColorOptionButton = ({ color }: ColorOptionButtonProperties) => {
  const [editor] = useLexicalComposerContext()
  const setColor = useSetAtom(fontColorAtom)
  const setFontColor = () => {
    setColor(color)
    applyTextStyles(editor, { color })
  }
  const styles = useColorOptionButtonStyles({ color })
  return <Button sx={styles.root} onClick={setFontColor} />
}

export { ColorOptionButton }
