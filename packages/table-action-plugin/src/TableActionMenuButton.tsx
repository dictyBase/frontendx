import React from "react"
import { IconButton } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { useSetAtom } from "jotai"
import { tableActionMenuOpenAtom } from "./atomConfigs"

type TableActionMenuButtonProperties = {
  menuButtonReference: React.RefObject<HTMLButtonElement>
}

const TableActionMenuButton = ({
  menuButtonReference,
}: TableActionMenuButtonProperties) => {
  const setIsOpen = useSetAtom(tableActionMenuOpenAtom)

  return (
    <IconButton
      sx={{ position: "absolute" }}
      size="small"
      onClick={() => setIsOpen(true)}
      ref={menuButtonReference}>
      <KeyboardArrowDownIcon />
    </IconButton>
  )
}

export { TableActionMenuButton }
