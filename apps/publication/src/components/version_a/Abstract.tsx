import React from "react"
import { Box, Typography, Divider, makeStyles } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty } from "fp-ts/string"
import { match as Bmatch } from "fp-ts/boolean"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "'Playfair Display Variable', serif",
    marginBottom: theme.spacing(0.5),
  },
  body: {
    lineHeight: 1.5,
    fontFamily: "'Inter Tight Variable', sans-serif",
  },
}))

type Properties = {
  abstract: string
}

/**
 * Displays the abstract of the publication.
 */
const Abstract = ({ abstract }: Properties) => {
  const classes = useStyles()
  return pipe(
    abstract,
    SisEmpty,
    Bmatch(
      () =>
        pipe(
          <>
            <Typography variant="h2" className={classes.title}>
              Abstract
            </Typography>
            <Divider />
            <Box pt={2} className={classes.body}>
              {parseFormattedStringToDomElements(abstract)}
            </Box>
          </>,
        ),
      () => <></>,
    ),
    (inner) => <Box pt={2}>{inner}</Box>,
  )
}

export { Abstract }
