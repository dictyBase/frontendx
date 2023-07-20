import { Link } from "react-router-dom"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    "&:hover": {
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
  },
}))

const BackToHomePage = () => {
  const classes = useStyles()
  return (
    <Grid item>
      <Box margin={2}>
        <Button
          component={Link}
          to="/"
          color="primary"
          variant="contained"
          size="large"
          className={classes.button}
          startIcon={<FontAwesomeIcon icon="home" />}>
          Back to DSC homepage
        </Button>
      </Box>
    </Grid>
  )
}

export { BackToHomePage }
