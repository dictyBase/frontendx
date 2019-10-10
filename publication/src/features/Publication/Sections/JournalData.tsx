import React from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import parse from "date-fns/parse"
import format from "date-fns/format"
import addDays from "date-fns/add_days"

const styles = createStyles({
  link: {
    textDecoration: "none",
    color: "#0059b3",
  },
  journal: {
    fontWeight: "bold",
  },
  section: {
    paddingBottom: "15px",
  },
})

interface Props {
  classes: {
    link: string
    journal: string
    section: string
  }
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

export const JournalData = (props: Props) => {
  const { classes, data } = props
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
        <Grid item xs={12} sm={4}>
          DOI:{" "}
          <a
            href={doiURL}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}>
            {data.doi}
          </a>
        </Grid>
        <Grid item xs={12} sm={4}>
          PMID:{" "}
          <a
            href={pubmedURL}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}>
            {data.id}
          </a>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(JournalData)
