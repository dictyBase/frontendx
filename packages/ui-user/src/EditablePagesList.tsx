import { Link as RouterLink } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core"
import FolderIcon from "@material-ui/icons/Folder"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))

const EditablePagesList = () => {
  const classes = useStyles()
  return (
    <Paper elevation={3} className={classes.root}>
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
    </Paper>
  )
}

export { EditablePagesList }
