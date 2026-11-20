import { type MouseEvent } from "react"
import PostAddIcon from "@mui/icons-material/PostAdd"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

type ContentMangerMenuItemProperties = {
  onClick: (event: MouseEvent<HTMLLIElement>) => void
}

const ContentManagerMenuItem = ({
  onClick,
}: ContentMangerMenuItemProperties) => (
  <MenuItem onClick={onClick}>
    <ListItemIcon sx={{ minWidth: "2rem" }}>
      <PostAddIcon />
    </ListItemIcon>
    <ListItemText> Add Content </ListItemText>
  </MenuItem>
)

export { ContentManagerMenuItem }
