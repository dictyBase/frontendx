import { type MouseEvent } from "react"
import PersonSharp from "@material-ui/icons/PersonSharp"
import { makeStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

const useStyles = makeStyles({
  listIcon: {
    minWidth: "2rem",
  },
})

type ProfileMenuItemProperties = {
  onClick: (event: MouseEvent<HTMLLIElement>) => void
}

const ProfileMenuItem = ({ onClick }: ProfileMenuItemProperties) => {
  const { listIcon } = useStyles()
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon className={listIcon}>
        <PersonSharp />
      </ListItemIcon>
      <ListItemText> Profile </ListItemText>
    </MenuItem>
  )
}

export { ProfileMenuItem }
