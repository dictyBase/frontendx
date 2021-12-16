import React from "react"
import Grid from "@material-ui/core/Grid"
import { Publication } from "dicty-graphql-schema"
import Head from "next/head"
import PublicationSidebar from "components/PublicationSidebar"
import PublicationBody from "components/PublicationBody"
import useStyles from "styles/publicationStyles"
import { make as PublicationHeader } from "components/PublicationHeader.bs"

interface PublicationPageProps {
  publication: Publication
}

const PublicationPage = ({ publication }: PublicationPageProps) => {
  const classes = useStyles()
  const title = publication.title

  return (
    <Grid container>
      <Head>
        <title>dictyBase Literature - {title}</title>
        <meta
          name="description"
          content={`dictyBase literature page for title ${title}`}
        />
      </Head>

      <Grid item xs={12}>
        <PublicationHeader />
      </Grid>
      <Grid item xs={12} sm={2} className={classes.sidebar}>
        <PublicationSidebar doi={publication.doi} />
      </Grid>
      <Grid item xs={12} sm={10}>
        <PublicationBody publication={publication} />
      </Grid>
    </Grid>
  )
}

export default PublicationPage
