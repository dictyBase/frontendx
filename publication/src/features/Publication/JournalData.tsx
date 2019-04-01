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

  return (
    <div className={classes.section}>
      <div>
        <span className={classes.journal}>{data.journal},&nbsp;</span>
        <span>
          {data.pub_date}, p{data.pages}
        </span>
      </div>
      <Grid container>
        <Grid item xs={6}>
          DOI:{" "}
          <a
            href={doiURL}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}>
            {data.doi}
          </a>
        </Grid>
        <Grid item xs={6}>
          Pubmed:{" "}
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
