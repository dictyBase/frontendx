import { type MouseEvent } from "react"
import PersonSharp from "@mui/icons-material/PersonSharp"
import { makeStyles } from "tss-react/mui"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

const useStyles = makeStyles()({
  listIcon: {
    minWidth: "2rem",
  },
})

type ProfileMenuItemProperties = {
  onClick: (event: MouseEvent<HTMLLIElement>) => void
}

const ProfileMenuItem = ({ onClick }: ProfileMenuItemProperties) => {
  const { classes } = useStyles()
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon className={classes.listIcon}>
        <PersonSharp />
      </ListItemIcon>
      <ListItemText> Profile </ListItemText>
    </MenuItem>
  )
}

export { ProfileMenuItem }
