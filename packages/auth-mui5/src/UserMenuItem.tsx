import { type MouseEvent, type ReactNode } from "react"
import makeStyles from '@mui/styles/makeStyles';
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

const useStyles = makeStyles({
  listIcon: {
    minWidth: "2rem",
  },
})

type UserMenuItemProperties = {
  icon: ReactNode
  children: string
  onClick: (event: MouseEvent<HTMLLIElement>) => void
}

const UserMenuItem = ({ icon, children, onClick }: UserMenuItemProperties) => {
  const { listIcon } = useStyles()
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon className={listIcon}>{icon}</ListItemIcon>
      <ListItemText>{children}</ListItemText>
    </MenuItem>
  )
}

export { UserMenuItem }
