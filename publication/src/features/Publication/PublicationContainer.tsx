import React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { Helmet } from "react-helmet"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import LeftSidebar from "./LeftSidebar"
import PublicationDisplay from "./PublicationDisplay"
import PublicationLoader from "./PublicationLoader"
import ErrorPage from "../../common/components/ErrorPage"

const styles = (theme: Theme) =>
  createStyles({
    layout: {
      width: "75%",
      marginLeft: "auto",
      marginRight: "auto",
      [theme.breakpoints.up(1300 + theme.spacing(3) * 2)]: {
        width: 1300,
        marginLeft: "auto",
        marginRight: "auto",
      },
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    title: {
      textAlign: "center",
    },
    sidebar: {
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
    },
  })

interface Props {
  classes: {
    layout: string
    title: string
    sidebar: string
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
        rank: string
        initials: string
      }>
      doi: string
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

export const GET_PUBLICATION = gql`
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

  return (
    <Query query={GET_PUBLICATION} variables={{ id: match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) return <PublicationLoader />
        if (error) return <ErrorPage error={error} />

        return (
          <Grid container className={classes.layout}>
            <Helmet>
              <title>dictyBase Literature - {data.publication.title}</title>
              <meta
                name="description"
                content={`dictyBase literature page for title ${data.publication.title}`}
              />
            </Helmet>
            <Grid item xs={12}>
              <h1 className={classes.title}>dictyBase Literature</h1>
            </Grid>
            <Grid item xs={12} sm={2} className={classes.sidebar}>
              <LeftSidebar data={data} />
            </Grid>
            <Grid item xs={12} sm={10}>
              <PublicationDisplay data={data} />
            </Grid>
          </Grid>
        )
      }}
    </Query>
  )
}

export default withRouter(withStyles(styles)(PublicationContainer))
