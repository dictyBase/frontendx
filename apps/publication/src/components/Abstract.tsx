import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import { Do as IDo, bind as Ibind } from "fp-ts/Identity"
import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty } from "fp-ts/string"
import { match as Bmatch } from "fp-ts/boolean"

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
        pipe({ __html: abstract }, (abstractContent) => (
          <>
            <Typography variant="h2">Abstract</Typography>
            <Divider />
            <Box pt={2} pb={2}>
              <div dangerouslySetInnerHTML={abstractContent} />
            </Box>
          </>
        )),
      () => <></>,
    ),
    (inner) => (
      <Box pt={2} pb={1}>
        {inner}
      </Box>
    ),
  )

export { Abstract }
