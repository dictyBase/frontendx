import { IconButton } from "@mui/material"
import { Redo } from "@mui/icons-material"
import { useAtomValue } from "jotai"
import { canRedoAtom } from "../context/atomConfigs"
import { useToolbarItemStyles } from "../hooks/useToolbarItemStyles"
import { useRedo } from "../hooks/useRedo"

const RedoButton = () => {
  const canRedo = useAtomValue(canRedoAtom)
  const styles = useToolbarItemStyles()
  const onClick = useRedo()

  return (
    <IconButton
      disabled={!canRedo}
      sx={styles.root}
      onClick={onClick}
      title="Redo"
      aria-label="Redo"
      size="large">
      <Redo />
    </IconButton>
  )
}

export { RedoButton }
