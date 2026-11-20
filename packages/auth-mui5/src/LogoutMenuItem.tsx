import { useLogto } from "@logto/react"
import MeetingRoom from "@mui/icons-material/MeetingRoom"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

/**
 * LogoutMenuItemProperties interface represents the props for the LogoutMenuItem component.
 * @param redirectPath - The path to redirect to after signing out.
 */
type LogoutMenuItemProperties = {
  redirectPath: string
}

/**
 * LogoutMenuItem is a functional component that renders a logout menu item.
 */
const LogoutMenuItem = ({ redirectPath }: LogoutMenuItemProperties) => {
  const { signOut } = useLogto()

  const handleClick = () => {
    signOut(redirectPath)
  }

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon sx={{ minWidth: "2rem" }}>
        <MeetingRoom />
      </ListItemIcon>
      <ListItemText> Logout </ListItemText>
    </MenuItem>
  )
}

export { LogoutMenuItem }
