import { type MouseEvent } from "react"
import PersonSharp from "@mui/icons-material/PersonSharp"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

type ProfileMenuItemProperties = {
  onClick: (event: MouseEvent<HTMLLIElement>) => void
}

const ProfileMenuItem = ({ onClick }: ProfileMenuItemProperties) => (
  <MenuItem onClick={onClick}>
    <ListItemIcon sx={{ minWidth: "2rem" }}>
      <PersonSharp />
    </ListItemIcon>
    <ListItemText> Profile </ListItemText>
  </MenuItem>
)

export { ProfileMenuItem }
