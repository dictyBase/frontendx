import React from "react"
import Grid from "@material-ui/core/Grid"
import { Publication } from "dicty-graphql-schema"
import Head from "next/head"
import { PublicationSidebar } from "./PublicationSidebar"
import { PublicationBody } from "./PublicationBody"
import useStyles from "../styles/publicationStyles"
import { PublicationHeader } from "./PublicationHeader"

interface PublicationPageProperties {
  publication: Publication
}

const PublicationPage = ({ publication }: PublicationPageProperties) => {
  const classes = useStyles()
  const { title, doi } = publication

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
        <PublicationSidebar doi={doi} />
      </Grid>
      <Grid item xs={12} sm={10}>
        <PublicationBody publication={publication} />
      </Grid>
    </Grid>
  )
}

export { PublicationPage }
