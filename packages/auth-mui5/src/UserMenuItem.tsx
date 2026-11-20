import { type MouseEvent, type ReactNode } from "react"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

type UserMenuItemProperties = {
  icon: ReactNode
  children: string
  onClick: (event: MouseEvent<HTMLLIElement>) => void
}

const UserMenuItem = ({ icon, children, onClick }: UserMenuItemProperties) => (
  <MenuItem onClick={onClick}>
    <ListItemIcon sx={{ minWidth: "2rem" }}>{icon}</ListItemIcon>
    <ListItemText>{children}</ListItemText>
  </MenuItem>
)

export { UserMenuItem }
