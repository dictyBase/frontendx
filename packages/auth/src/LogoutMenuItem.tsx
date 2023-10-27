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

type LogoutMenuItemProperties = {
  redirectPath: string
}

const LogoutMenuItem = ({ redirectPath }: LogoutMenuItemProperties) => {
  const { signOut } = useLogto()
  const { listIcon } = useStyles()
  return (
    <MenuItem onClick={() => signOut(redirectPath)}>
      <ListItemIcon className={listIcon}>
        <MeetingRoom />
      </ListItemIcon>
      <ListItemText> Logout </ListItemText>
    </MenuItem>
  )
}

export { LogoutMenuItem }
