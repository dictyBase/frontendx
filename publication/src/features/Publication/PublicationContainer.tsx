import React from "react"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useQuery } from "@apollo/react-hooks"
import Grid from "@material-ui/core/Grid"
import LeftSidebar from "./LeftSidebar"
import PublicationDisplay from "./PublicationDisplay"
import PublicationLoader from "./PublicationLoader"
import PublicationHeader from "./PublicationHeader"
import ErrorPage from "common/components/ErrorPage"
import { GET_PUBLICATION } from "common/graphql/query"
import useStyles from "./publicationStyles"

type Publication = {
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
      issue: string
      journal: string
      pages: string
      pub_date: string
      pub_type?: string
      source?: string
      status?: string
      title: string
      volume: string
    }
  }
}

/**
 * PublicationContainer is the main component for an individual publication page.
 * It is responsible for fetching the data and passing it down to more specific components.
 */

const PublicationContainer = () => {
  const { id } = useParams()
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_PUBLICATION, {
    variables: { id: id },
  })

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
      <PublicationHeader />
      <Grid item xs={12} sm={2} className={classes.sidebar}>
        <LeftSidebar data={data} />
      </Grid>
      <Grid item xs={12} sm={10}>
        <PublicationDisplay data={data} />
      </Grid>
    </Grid>
  )
}

export type { Publication }
export default PublicationContainer
