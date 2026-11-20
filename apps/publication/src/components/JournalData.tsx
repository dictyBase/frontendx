import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty } from "fp-ts/string"
import {
  map as Omap,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { match as Bmatch } from "fp-ts/boolean"
import { format, addDays, parseISO } from "date-fns/fp"
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

const textStyle = {
  fontFamily: "'Inter Tight Variable', sans-serif",
}

interface JournalDataProperties {
  data: Publication
}

/**
 * JournalData displays general data related to the publication.
 */

const JournalData = ({ data }: JournalDataProperties) => {
  const { id, doi, pub_date, journal, pages, issue, volume } = data
  const formattedIssue = formatIssue(issue)
  const pubmedURL = `https://pubmed.gov/${id}`
  const doiURL = `https://doi.org/${doi}`
  // convert ISO 8601 string to Date format
  // otherwise the 00:00:00.000Z causes it to return the previous day
  return (
    <Box mt={2}>
      <Box pb={1}>
        <Typography variant="h3" component="span" sx={textStyle}>
          {`Published `}
        </Typography>
        {pipe(
          pub_date,
          OfromNullable,
          Omap((date) =>
            pipe(date, parseISO, addDays(1), format("PPP"), (formattedDate) => (
              <Typography variant="h3" component="span" sx={textStyle}>
                {`on ${formattedDate} `}
              </Typography>
            )),
          ),
          OgetOrElse(() => <></>),
        )}
        <Typography variant="h3" component="span" sx={textStyle}>
          {`in `}
        </Typography>
        <Typography
          variant="h3"
          component="span"
          sx={{
            fontWeight: 600,
            fontStyle: "italic",
            paddingRight: 0.5,
            fontFamily: "'Inter Tight Variable', sans-serif",
          }}>
          {journal},
        </Typography>
        <Typography variant="h3" component="span" sx={textStyle}>
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
