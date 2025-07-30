import { type MouseEvent } from "react"
import PersonSharp from "@mui/icons-material/PersonSharp"
import makeStyles from "@mui/styles/makeStyles"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

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
