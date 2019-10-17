import React from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import parse from "date-fns/parse"
import format from "date-fns/format"
import addDays from "date-fns/add_days"
import JournalDataItem from "./JournalDataItem"

const useStyles = makeStyles({
  journal: {
    fontWeight: "bold",
  },
  section: {
    paddingBottom: "15px",
  },
})

interface Props {
  data: {
    doi: string
    journal: string
    pages: string
    pub_date: string
    id: string
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
  const day = addDays(parse(data.pub_date), 1)
  // convert Date to desired display format
  const date = format(day, "D MMM YYYY")

  return (
    <div className={classes.section}>
      <div>
        <span className={classes.journal}>{data.journal},&nbsp;</span>
        <span>
          {date}, {data.pages}
        </span>
      </div>
      <Grid container>
        <JournalDataItem title="DOI" url={doiURL} content={data.doi} />
        <JournalDataItem title="PMID" url={pubmedURL} content={data.id} />
      </Grid>
    </div>
  )
}

export default JournalData
