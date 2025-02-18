import { useNavigate } from "react-router-dom"
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
  icon: {
    paddingBottom: 0,
    paddingTop: 0,
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
  const navigate = useNavigate()
  const classes = useStyles()
  const onClick = () => {
    navigate("/community/info/edit")
  }
  return (
    <Box className={classes.root}>
      <Typography color="secondary" variant="h2">
        Dictyostelium discoideum
        <IconButton
          color="secondary"
          size="small"
          className={classes.icon}
          onClick={onClick}>
          <EditIcon />
        </IconButton>
      </Typography>
      <Editor content={{ editorState: content, storageKey: slug }} />
    </Box>
  )
}

export { AuthorizedDictyInfoDisplay }
