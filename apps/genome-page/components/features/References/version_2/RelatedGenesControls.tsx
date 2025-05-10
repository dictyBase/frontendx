import { Box, Container, Paper, TextField, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  container: {
    padding: "1rem",
  },
})

const RelatedGenesControls = () => {
  const classes = useStyles()
  return (
    <Paper>
      <Box className={classes.container}>
        <TextField variant="outlined" />
      </Box>
    </Paper>
  )
}

export { RelatedGenesControls }
