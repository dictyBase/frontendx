import { Link as RouterLink } from "react-router-dom"
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material"
import FolderIcon from "@mui/icons-material/Folder"

const EditablePagesList = () => (
  <Paper elevation={3} sx={{ padding: 3 }}>
    <Typography variant="h2" gutterBottom>
      Editable Pages
    </Typography>
    <Typography variant="h3" gutterBottom>
      Dicty Stock Center
    </Typography>
    <List component="nav">
      <ListItem disablePadding>
        <ListItemButton component={RouterLink} to="/home/editable">
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          component={RouterLink}
          to="/information/additional-materials/editable">
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Additional Materials" />
        </ListItemButton>
      </ListItem>
    </List>
  </Paper>
)

export { EditablePagesList }
