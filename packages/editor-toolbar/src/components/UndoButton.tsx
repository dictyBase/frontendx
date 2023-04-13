import { IconButton } from "@material-ui/core"
import { Undo } from "@material-ui/icons"
import { useAtomValue } from "jotai"
import { canUndoAtom } from "../context/atomConfigs"
import useToolbarItemStyles from "../hooks/useToolbarItemStyles"
import useUndo from "../hooks/useUndo"

const UndoButton = () => {
  const canUndo = useAtomValue(canUndoAtom)
  const classes = useToolbarItemStyles()
  const onClick = useUndo()

  return (
    <IconButton
      disabled={!canUndo}
      className={classes.root}
      onClick={onClick}
      title="Undo"
      aria-label="Undo">
      <Undo />
    </IconButton>
  )
}

export default UndoButton
