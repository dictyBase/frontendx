import { Box, Grid } from "@mui/material"
import ErrorIcon from "@mui/icons-material/Error"
import { pipe } from "fp-ts/function"
import {
  map as Omap,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { ErrorMessage } from "./ErrorMessage"
import { errorStyles } from "./errorStyles"

/**
 * UI display when there is a general error.
 */

type OtherErrorProperties = {
  message?: string
}

const OtherError = ({ message }: OtherErrorProperties) => (
  <Grid container sx={errorStyles.mainGrid} justifyContent="center">
    <Grid item xs={10} md={8}>
      <Box sx={errorStyles.error400}>
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
          Omap((m) => <Box sx={errorStyles.description}>{m}</Box>),
          OgetOrElse(() => <></>),
        )}
        <ErrorMessage />
      </Box>
    </Grid>
  </Grid>
)

export { OtherError }
