import { FunctionComponent } from "react"
import { makeStyles, Paper, Box, Container } from "@material-ui/core"
import { grey, blue } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: grey[100],
  },
  paper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    borderStyle: "none solid",
    borderColor: blue[50],
    borderWidth: "4rem",
    borderRadius: 0,
    [theme.breakpoints.down("md")]: {
      border: "none",
    },
  },
  container: {
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
}))

const EditorContainer: FunctionComponent = ({ children }) => {
  const classes = useStyles()

  return (
    <Box className={classes.background}>
      <Container maxWidth="lg">
        <Paper elevation={3} className={classes.paper}>
          {children}
        </Paper>
      </Container>
    </Box>
  )
}

export { EditorContainer }
