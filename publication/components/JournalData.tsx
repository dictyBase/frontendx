import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles, Theme } from "@material-ui/core/styles"
import JournalDataItem from "./JournalDataItem"
import { addDays, format, parseISO } from "date-fns"
import { Publication } from "dicty-graphql-schema"

const useStyles = makeStyles((theme: Theme) => ({
  journal: {
    fontWeight: "bold",
    paddingRight: theme.spacing(0.5),
  },
}))

interface JournalDataProps {
  data: Publication
}

/**
 * JournalData displays general data related to the publication.
 */

export const JournalData = ({ data }: JournalDataProps) => {
  const { id, doi, pub_date, journal, pages, issue, volume } = data

  const classes = useStyles()
  const pubmedURL = `https://pubmed.gov/${id}`
  const doiURL = `https://doi.org/${doi}`
  // convert ISO 8601 string to Date format
  // otherwise the 00:00:00.000Z causes it to return the previous day
  const day = addDays(parseISO(pub_date), 1)
  // convert Date to desired display format
  const date = format(day, "d MMM yyyy")

  return (
    <Box pb={2}>
      <Box>
        <Typography component="span" className={classes.journal}>
          {journal},
        </Typography>
        <Typography component="span">
          {date}, {volume}({issue}):{pages}
        </Typography>
      </Box>
      <Box>
        <JournalDataItem title="DOI" url={doiURL} content={doi} />
        <JournalDataItem title="PMID" url={pubmedURL} content={id} />
      </Box>
    </Box>
  )
}

export default JournalData
