import { IconButton } from "@material-ui/core"
import { Redo } from "@material-ui/icons"
import { useAtomValue } from "jotai"
import { canRedoAtom } from "../context/atomConfigs"
import useToolbarItemStyles from "../hooks/useToolbarItemStyles"
import useRedo from "../hooks/useRedo"

const RedoButton = () => {
  const canRedo = useAtomValue(canRedoAtom)
  const classes = useToolbarItemStyles()
  const onClick = useRedo()

  return (
    <IconButton
      disabled={!canRedo}
      className={classes.root}
      onClick={onClick}
      title="Redo"
      aria-label="Redo">
      <Redo />
    </IconButton>
  )
}

export default RedoButton
