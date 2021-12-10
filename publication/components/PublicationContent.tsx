import React from "react"
import Grid from "@material-ui/core/Grid"
import { Publication } from "dicty-graphql-schema"
import Head from "next/head"
import PublicationHeader from "components/PublicationHeader"
import LeftSidebar from "components/LeftSidebar"
import PublicationDisplay from "components/PublicationDisplay"
import useStyles from "styles/publicationStyles"

interface PublicationProps {
  data: Publication
}

const PublicationContent = ({ data }: PublicationProps) => {
  const classes = useStyles()
  const title = data.title

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
        <LeftSidebar doi={data.doi} />
      </Grid>
      <Grid item xs={12} sm={10}>
        <PublicationDisplay data={data} />
      </Grid>
    </Grid>
  )
}

export default PublicationContent
