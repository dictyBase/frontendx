import React from "react"
import { IconButton } from "@material-ui/core"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import { useSetAtom } from "jotai"
import useTableMenuButtonStyles from "./useTableMenuButtonStyles"
import { tableActionMenuOpenAtom } from "./atomConfigs"

type TableActionMenuButtonProperties = {
  menuButtonReference: React.RefObject<HTMLButtonElement>
}

const TableActionMenuButton = ({
  menuButtonReference,
}: TableActionMenuButtonProperties) => {
  const setIsOpen = useSetAtom(tableActionMenuOpenAtom)
  const { root } = useTableMenuButtonStyles()

  return (
    <IconButton
      size="small"
      onClick={() => setIsOpen(true)}
      ref={menuButtonReference}
      className={root}>
      <KeyboardArrowDownIcon />
    </IconButton>
  )
}

export default TableActionMenuButton
