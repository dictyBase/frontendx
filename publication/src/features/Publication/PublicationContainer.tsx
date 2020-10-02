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

type Params = {
  /** Pubmed ID from the URL */
  id: string
}

/**
 * PublicationContainer is the main component for an individual publication page.
 * It is responsible for fetching the data and passing it down to more specific components.
 */

const PublicationContainer = () => {
  const { id } = useParams<Params>()
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

export default PublicationContainer
