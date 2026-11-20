import React from "react"
import { Box, Typography, Divider } from "@mui/material"
import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty } from "fp-ts/string"
import { match as Bmatch } from "fp-ts/boolean"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"

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
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Playfair Display Variable', serif",
                marginBottom: 0.5,
              }}>
              Abstract
            </Typography>
            <Divider />
            <Box
              pt={2}
              sx={{
                lineHeight: 1.5,
                fontFamily: "'Inter Tight Variable', sans-serif",
                fontSize: "14pt",
              }}>
              {parseFormattedStringToDomElements(abstract)}
            </Box>
          </>,
        ),
      () => <></>,
    ),
    (inner) => <Box pt={2}>{inner}</Box>,
  )

export { Abstract }
