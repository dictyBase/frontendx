import { IconButton } from "@mui/material"
import { Undo } from "@mui/icons-material"
import { useAtomValue } from "jotai"
import { canUndoAtom } from "../context/atomConfigs"
import { useToolbarItemStyles } from "../hooks/useToolbarItemStyles"
import { useUndo } from "../hooks/useUndo"

const UndoButton = () => {
  const canUndo = useAtomValue(canUndoAtom)
  const styles = useToolbarItemStyles()
  const onClick = useUndo()

  return (
    (<IconButton
      disabled={!canUndo}
      sx={styles.root}
      onClick={onClick}
      title="Undo"
      aria-label="Undo"
      size="large">
      <Undo />
    </IconButton>)
  );
}

export { UndoButton }
