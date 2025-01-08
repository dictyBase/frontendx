import { FunctionComponent } from "react"
import { makeStyles, Paper, Box, Container } from "@material-ui/core"
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: grey[100],
  },
  paper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}))

const EditorContainer: FunctionComponent = ({ children }) => {
  const classes = useStyles()

  return (
    <Box className={classes.background}>
      <Container>
        <Paper elevation={3} className={classes.paper}>
          {children}
        </Paper>
      </Container>
    </Box>
  )
}

export { EditorContainer }
