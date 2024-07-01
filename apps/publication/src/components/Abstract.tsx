import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty } from "fp-ts/string"
import { match as Bmatch } from "fp-ts/boolean"
import { parseFormattedStringToDOMElements } from "../common/utils/parseFormattedStringToDOMElements"

type Properties = {
  abstract: string
}

/**
 * Displays the abstract of the publication.
 */
const Abstract = ({ abstract }: Properties) =>
  pipe(
    abstract,
    SisEmpty,
    Bmatch(
      () =>
        pipe(
          <>
            <Typography variant="h2">Abstract</Typography>
            <Divider />
            <Box pt={2} pb={2}>
              {parseFormattedStringToDOMElements(abstract)}
            </Box>
          </>,
        ),
      () => <></>,
    ),
    (inner) => (
      <Box pt={2} pb={1}>
        {inner}
      </Box>
    ),
  )

export { Abstract }
