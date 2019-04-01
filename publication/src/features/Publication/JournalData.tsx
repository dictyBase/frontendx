import React from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"

const styles = createStyles({
  link: {
    textDecoration: "none",
    color: "rgb(32, 105, 156)",
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
}

const data = {
  doi: "9.0909/j.diff.1964.02.01",
  full_text_url: "https://doi.org/9.0909/j.diff.1964.02.01",
  journal:
    "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
  page: "71-79",
  publication_date: "1964-01-29",
  pubmed: "12345678",
  pubmed_url: "https://pubmed.gov/12345678",
  // add volume when available
}

/**
 * JournalData displays general data related to the publication.
 */

export const JournalData = (props: Props) => {
  const { classes } = props
  return (
    <div className={classes.section}>
      <div>
        <span className={classes.journal}>{data.journal},&nbsp;</span>
        <span>
          {data.publication_date}, p{data.page}
        </span>
      </div>
      <Grid container>
        <Grid item xs={6}>
          DOI:{" "}
          <a
            href={data.full_text_url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}>
            {data.doi}
          </a>
        </Grid>
        <Grid item xs={6}>
          Pubmed:{" "}
          <a
            href={data.pubmed_url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}>
            {data.pubmed}
          </a>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(JournalData)
