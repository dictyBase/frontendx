import React from "react"
import { Helmet } from "react-helmet"
import Grid from "@material-ui/core/Grid"
import { Publication, usePublicationQuery } from "dicty-graphql-schema"
import LeftSidebar from "./LeftSidebar"
import PublicationDisplay from "./PublicationDisplay"
import PublicationLoader from "./PublicationLoader"
import PublicationHeader from "./PublicationHeader"
import ErrorPage from "common/components/ErrorPage"
import useStyles from "./publicationStyles"
import { useRouter } from "next/router"

/**
 * PublicationContainer is the main component for an individual publication page.
 * It is responsible for fetching the data and passing it down to more specific components.
 */
const PublicationContainer = () => {
  const id = useRouter().query.publicationId as string
  const classes = useStyles()
  const { loading, error, data } = usePublicationQuery({
    variables: { id: id },
  })

  if (loading) return <PublicationLoader />
  if (error || !data) return <ErrorPage />

  const title = data?.publication?.title || ""
  const publication = data.publication as Publication

  return (
    <Grid container>
      <Helmet>
        <title>dictyBase Literature - {title}</title>
        <meta
          name="description"
          content={`dictyBase literature page for title ${title}`}
        />
      </Helmet>
      <Grid item xs={12}>
        <PublicationHeader />
      </Grid>
      {data?.publication && (
        <React.Fragment>
          <Grid item xs={12} sm={2} className={classes.sidebar}>
            <LeftSidebar doi={publication.doi} />
          </Grid>
          <Grid item xs={12} sm={10}>
            <PublicationDisplay data={publication} />
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  )
}

export default PublicationContainer
