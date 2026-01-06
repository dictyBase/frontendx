import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { Theme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
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
