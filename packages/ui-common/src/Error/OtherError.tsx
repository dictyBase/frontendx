import { Grid } from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error"
import { pipe } from "fp-ts/function"
import {
  map as Omap,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { ErrorMessage } from "./ErrorMessage"
import { useStyles } from "./errorStyles"

/**
 * UI display when there is a general error.
 */

type OtherErrorProperties = {
  message?: string
}

const OtherError = ({ message }: OtherErrorProperties) => {
  const { classes } = useStyles()

  return (
    <Grid container className={classes.mainGrid} justifyContent="center">
      <Grid item xs={10} md={8}>
        <div className={classes.error400}>
          <img
            src="https://storage.dictybase.dev/editor/assets/2024-11-04/0627257c-9ce3-4f02-b000-9e16ef5b1062"
            alt="Sad Dicty -- HTTP Error"
          />
          <h1>
            <ErrorIcon />
            Error
          </h1>
          {pipe(
            message,
            OfromNullable,
            Omap((m) => <div className={classes.description}>{m}</div>),
            OgetOrElse(() => <></>),
          )}
          <ErrorMessage />
        </div>
      </Grid>
    </Grid>
  )
}

export { OtherError }
