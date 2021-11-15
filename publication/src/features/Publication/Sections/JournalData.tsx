import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles, Theme } from "@material-ui/core/styles"
import JournalDataItem from "./JournalDataItem"
import { addDays, format, parseISO } from "date-fns"

const useStyles = makeStyles((theme: Theme) => ({
  journal: {
    fontWeight: "bold",
    paddingRight: theme.spacing(0.5),
  },
}))

type Props = {
  data: {
    doi: string
    journal: string
    pages: string
    pub_date: string
    id: string
    issue: string
    volume: string
  }
}

/**
 * JournalData displays general data related to the publication.
 */

export const JournalData = ({ data }: Props) => {
  const classes = useStyles()
  const pubmedURL = `https://pubmed.gov/${data.id}`
  const doiURL = `https://doi.org/${data.doi}`
  // convert ISO 8601 string to Date format
  // otherwise the 00:00:00.000Z causes it to return the previous day
  const day = addDays(parseISO(data.pub_date), 1)
  // convert Date to desired display format
  const date = format(day, "d MMM yyyy")

  return (
    <Box pb={2}>
      <Box>
        <Typography component="span" className={classes.journal}>
          {data.journal},
        </Typography>
        <Typography component="span">
          {date}, {data.volume}({data.issue}):{data.pages}
        </Typography>
      </Box>
      <Box>
        <JournalDataItem title="DOI" url={doiURL} content={data.doi} />
        <JournalDataItem title="PMID" url={pubmedURL} content={data.id} />
      </Box>
    </Box>
  )
}

export default JournalData
