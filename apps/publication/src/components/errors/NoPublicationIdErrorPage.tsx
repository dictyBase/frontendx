import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import ErrorIcon from "@mui/icons-material/Error"

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
 * NoPublicationIdErrorPage is the display component when there no publication ID is provided.
 */

const NoPublicationIdErrorPage = () => {
  const classes = useStyles()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="center">
      <Box className={classes.container}>
        <img src="sad-dicty.png" alt="Sad Dicty -- Missing ID Error" />
        <Typography className={classes.text} variant="h1">
          <ErrorIcon /> Error
        </Typography>
        <Typography variant="body1" className={classes.text}>
          Missing Publication ID in URL
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

export { NoPublicationIdErrorPage }
