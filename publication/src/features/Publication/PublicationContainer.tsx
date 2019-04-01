import React from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import LeftSidebar from "./LeftSidebar"
import PublicationDisplay from "./PublicationDisplay"

const styles = (theme: Theme) =>
  createStyles({
    layout: {
      width: "auto",
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
        width: 900,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    title: {
      textAlign: "center",
    },
  })

interface Props {
  classes: {
    layout: string
    title: string
  }
}

export interface Publication {
  data: {
    publication: {
      abstract: string
      authors: Array<{
        first_name: string
        last_name: string
        full_name: string
        initials: string
      }>
      doi: string
      full_text_url: string
      issn?: string
      issue?: number
      journal: string
      page: string
      publication_date: string
      pubmed: string
      pubmed_url: string
      pub_type?: string
      source?: string
      status?: string
      title: string
    }
  }
}

const data = {
  publication: {
    abstract:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non ipsum dolor. Cras consectetur luctus neque, nec facilisis magna rutrum non. Praesent gravida volutpat dolor sagittis porttitor. Sed ut turpis neque. In non libero vel ipsum bibendum lobortis. Nullam congue molestie nulla a sodales. Suspendisse eget faucibus nunc. Suspendisse a finibus elit. Sed at vulputate lorem. Ut pretium, ligula sit amet iaculis elementum, sem eros vehicula metus, malesuada lacinia dolor massa id massa.",
    doi: "9.0909/j.diff.1964.02.01",
    full_text_url: "https://doi.org/9.0909/j.diff.1964.02.01",
    journal:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    page: "71-79",
    publication_date: "1964-01-29",
    pubmed: "12345678",
    pubmed_url: "https://pubmed.gov/12345678",
    title: "This is a fake publication title that should be at least ten words",
    authors: [
      {
        first_name: "George",
        last_name: "Costanza",
        full_name: "Costanza G",
        initials: "GC",
      },
      {
        first_name: "Cosmo",
        last_name: "Kramer",
        full_name: "Kramer C",
        initials: "CK",
      },
    ],
  },
}
// this container will need to check for error, loading

/**
 * PublicationContainer is the main component for an individual publication page.
 * It is responsible for fetching the data and passing it down to more specific components.
 */

export const PublicationContainer = (props: Props) => {
  const { classes } = props
  return (
    <Grid container spacing={16} className={classes.layout}>
      <Grid item xs={12}>
        <h1 className={classes.title}>dictyBase Literature</h1>
      </Grid>
      <Grid item xs={3}>
        <LeftSidebar data={data} />
      </Grid>
      <Grid item xs={9}>
        <PublicationDisplay data={data} />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(PublicationContainer)
