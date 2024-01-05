import { Link as RouterLink } from "react-router-dom"
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import FolderIcon from "@material-ui/icons/Folder"

const EditablePagesList = () => (
  <>
    <Typography variant="h2" gutterBottom>
      Editable Pages
    </Typography>
    <Typography variant="h3" gutterBottom>
      Dicty Stock Center
    </Typography>
    <List component="nav">
      <ListItem button component={RouterLink} to="/home/editable">
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        component={RouterLink}
        to="/information/additional-materials/editable">
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Additional Materials" />
      </ListItem>
    </List>
  </>
)

export { EditablePagesList }
