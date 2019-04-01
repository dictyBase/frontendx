import React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import gql from "graphql-tag"
import { Query } from "react-apollo"
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
      id: string
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
      pages: string
      pub_date: string
      pub_type?: string
      source?: string
      status?: string
      title: string
    }
  }
}

const GET_PUBLICATION = gql`
  query Publication($id: ID!) {
    publication(id: $id) {
      id
      doi
      title
      abstract
      journal
      pub_date
      pages
      authors {
        initials
        last_name
      }
    }
  }
`

type FullProps = Props & RouteComponentProps<any>

/**
 * PublicationContainer is the main component for an individual publication page.
 * It is responsible for fetching the data and passing it down to more specific components.
 */

export const PublicationContainer = (props: FullProps) => {
  const { classes, match } = props
  const id = match.params.id

  return (
    <Query query={GET_PUBLICATION} variables={{ id: id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.toString()}</p>

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
      }}
    </Query>
  )
}

export default withRouter(withStyles(styles)(PublicationContainer))
