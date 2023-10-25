import { type MouseEvent, type ReactNode } from "react"
import { makeStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

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
