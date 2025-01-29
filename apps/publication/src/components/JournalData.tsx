import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty } from "fp-ts/string"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { match as Bmatch } from "fp-ts/boolean"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { addDays, format, parseISO } from "date-fns"
import { Publication } from "dicty-graphql-schema"
import { JournalDataItem } from "./JournalDataItem"

const formatIssue = (issue: string | null | undefined) =>
  pipe(
    issue,
    OfromNullable,
    OgetOrElse(() => ""),
    SisEmpty,
    Bmatch(
      () => `(${issue})`,
      () => "",
    ),
  )

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    fontFamily: "'Inter Tight Variable', sans-serif",
  },
  journal: {
    fontWeight: 600,
    fontStyle: "italic",
    paddingRight: theme.spacing(0.5),
    fontFamily: "'Inter Tight Variable', sans-serif",
  },
}))

interface JournalDataProperties {
  data: Publication
}

/**
 * JournalData displays general data related to the publication.
 */

const JournalData = ({ data }: JournalDataProperties) => {
  const { id, doi, pub_date, journal, pages, issue, volume } = data
  const classes = useStyles()
  const formattedIssue = formatIssue(issue)
  const pubmedURL = `https://pubmed.gov/${id}`
  const doiURL = `https://doi.org/${doi}`
  // convert ISO 8601 string to Date format
  // otherwise the 00:00:00.000Z causes it to return the previous day
  const day = addDays(parseISO(pub_date), 1)
  // convert Date to desired display format
  const date = format(day, "PPP")
  return (
    <Box mt={2}>
      <Box pb={1}>
        <Typography variant="h3" component="span" className={classes.text}>
          {`Published on `}
        </Typography>
        <Typography variant="h3" component="span" className={classes.text}>
          {`${date} in `}
        </Typography>
        <Typography variant="h3" component="span" className={classes.journal}>
          {journal},
        </Typography>
        <Typography variant="h3" component="span" className={classes.text}>
          <i>{volume}</i>
          {`${formattedIssue}, ${pages}`}
        </Typography>
      </Box>
      <Box>
        <JournalDataItem title="DOI" url={doiURL} content={doi} />
        <JournalDataItem title="PMID" url={pubmedURL} content={id} />
      </Box>
    </Box>
  )
}

export { JournalData }
