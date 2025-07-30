import { useLogto } from "@logto/react"
import MeetingRoom from "@mui/icons-material/MeetingRoom"
import makeStyles from '@mui/styles/makeStyles';
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

const useStyles = makeStyles({
  listIcon: {
    minWidth: "2rem",
  },
})

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
  const { listIcon } = useStyles()

  const handleClick = () => {
    signOut(redirectPath)
  }

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon className={listIcon}>
        <MeetingRoom />
      </ListItemIcon>
      <ListItemText> Logout </ListItemText>
    </MenuItem>
  )
}

export { LogoutMenuItem }
