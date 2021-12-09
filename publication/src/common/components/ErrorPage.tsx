import React from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
 * ErrorPage is the display component when there is an error.
 */

const ErrorPage = () => {
  const classes = useStyles()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
    >
      <Box className={classes.container}>
        <img src="public/sad-dicty.png" alt="Sad Dicty -- HTTP Error" />
        <Typography className={classes.text} variant="h1">
          <FontAwesomeIcon icon="exclamation-circle" /> Error
        </Typography>
        <Typography variant="body1" className={classes.text}>
          If this problem persists, please email us at{" "}
          <a href="mailto:dictybase@northwestern.edu">
            dictybase@northwestern.edu
          </a>
          .
        </Typography>
        <Button
          classes={{ root: classes.root }}
          component={Link}
          to="/"
          size="medium"
          variant="contained"
          color="primary"
        >
          Back to DSC Homepage
        </Button>
      </Box>
    </Box>
  )
}

export default ErrorPage
