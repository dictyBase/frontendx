import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ErrorIcon from "@material-ui/icons/Error"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    "&:hover": {
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
  },
  container: {
    backgroundColor: "#eff8fb",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  text: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))

/**
 * UnAuthorized is the display component when there is an error.
 */
const UnAuthorized = () => {
  const classes = useStyles()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="center">
      <Box className={classes.container}>
        <img
          src="https://storage.dictybase.dev/editor/assets/2024-06-10/bd362d90-6a23-44a3-a5b4-fbaaaa5117bd"
          alt="Sad Dicty -- HTTP Error"
        />
        <Typography className={classes.text} variant="h1">
          <ErrorIcon /> Unauthorized
        </Typography>
        <Typography variant="body1" className={classes.text}>
          You are not authorized to access this page
        </Typography>
        <Button
          classes={{ root: classes.root }}
          href="/"
          size="medium"
          variant="contained"
          color="primary">
          Back to DSC Homepage
        </Button>
      </Box>
    </Box>
  )
}

export { UnAuthorized }
