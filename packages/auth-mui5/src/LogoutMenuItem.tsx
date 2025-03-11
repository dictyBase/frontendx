import { useLogto } from "@logto/react"
import MeetingRoom from "@material-ui/icons/MeetingRoom"
import { makeStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

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
