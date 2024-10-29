import { type MouseEvent } from "react"
import PostAddIcon from "@material-ui/icons/PostAdd"
import { makeStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

const useStyles = makeStyles({
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
  const { listIcon } = useStyles()
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon className={listIcon}>
        <PostAddIcon />
      </ListItemIcon>
      <ListItemText> Manage Content </ListItemText>
    </MenuItem>
  )
}

export { ContentManagerMenuItem }
