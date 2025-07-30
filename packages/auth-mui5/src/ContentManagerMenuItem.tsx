import { type MouseEvent } from "react"
import PostAddIcon from "@mui/icons-material/PostAdd"
import { makeStyles } from "tss-react/mui"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

const useStyles = makeStyles()({
  listIcon: {
    minWidth: "2rem",
  },
})

type ContentMangerMenuItemProperties = {
  onClick: (event: MouseEvent<HTMLLIElement>) => void
}

const ContentManagerMenuItem = ({
  onClick,
}: ContentMangerMenuItemProperties) => {
  const { classes } = useStyles()
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon className={classes.listIcon}>
        <PostAddIcon />
      </ListItemIcon>
      <ListItemText> Add Content </ListItemText>
    </MenuItem>
  )
}

export { ContentManagerMenuItem }
