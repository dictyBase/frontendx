import Grid from "@material-ui/core/Grid"
import ErrorIcon from "@material-ui/icons/Error"
import { ErrorMessage } from "./ErrorMessage"
import { useStyles } from "./errorStyles"

/**
 * UI display when there is a general error.
 */

const OtherError = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.mainGrid} justifyContent="center">
      <Grid item xs={10} md={8}>
        <div className={classes.error400}>
          <img
            src="https://storage.dictybase.dev/editor/assets/2024-06-10/bd362d90-6a23-44a3-a5b4-fbaaaa5117bd"
            alt="Sad Dicty -- HTTP Error"
          />
          <h1>
            <ErrorIcon />
            Error
          </h1>
          <ErrorMessage />
        </div>
      </Grid>
    </Grid>
  )
}

export { OtherError }
