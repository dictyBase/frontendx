import { Typography, Box, makeStyles } from "@material-ui/core"
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

type DictyInfoDisplayProperties = {
  content: string
  slug: string
}

const DictyInfoDisplay = ({ content, slug }: DictyInfoDisplayProperties) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Typography color="secondary" variant="h2">
        Dictyostelium discoideum
      </Typography>
      <Editor content={{ editorState: content, storageKey: slug }} />
    </Box>
  )
}

export { DictyInfoDisplay }
