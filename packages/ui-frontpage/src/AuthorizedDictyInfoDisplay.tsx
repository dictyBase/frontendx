import { Typography, Box, IconButton, makeStyles } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import { Editor } from "@dictybase/editor"
import { teal } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: teal[50],
    color: "#04313f",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
  },
}))

type AuthorizedDictyInfoDisplayProperties = {
  content: string
  slug: string
}

const AuthorizedDictyInfoDisplay = ({
  content,
  slug,
}: AuthorizedDictyInfoDisplayProperties) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Typography color="secondary" variant="h2">
        Dictyostelium discoideum
        <IconButton color="secondary" size="small">
          <EditIcon />
        </IconButton>
      </Typography>
      <Editor content={{ editorState: content, storageKey: slug }} />
    </Box>
  )
}

export { AuthorizedDictyInfoDisplay }
