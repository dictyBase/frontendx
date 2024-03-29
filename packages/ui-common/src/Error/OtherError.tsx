import Grid from "@material-ui/core/Grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import sadDicty from "../assets/sad-dicty.png"
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
          <img src={sadDicty} alt="Sad Dicty -- HTTP Error" />
          <h1>
            <FontAwesomeIcon icon="exclamation-circle" /> Error
          </h1>
          <ErrorMessage />
        </div>
      </Grid>
    </Grid>
  )
}

export { OtherError }
