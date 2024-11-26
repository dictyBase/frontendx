import React from "react"
import Grid from "@material-ui/core/Grid"
import { Publication } from "dicty-graphql-schema"
import Head from "next/head"
import { PublicationSidebar } from "./PublicationSidebar"
import { PublicationBody } from "./PublicationBody"
import { useStyles } from "../../styles/publicationStyles"

interface PublicationPageProperties {
  publication: Publication
}

const PublicationPage = ({ publication }: PublicationPageProperties) => {
  const classes = useStyles()
  const { title, doi } = publication
  console.log(publication)
  return (
    <Grid container spacing={2} className={classes.container}>
      <Head>
        <title>dictyBase Literature - {title}</title>
        <meta
          name="description"
          content={`dictyBase literature page for title ${title}`}
        />
      </Head>

      <Grid item xs={12} sm={12} md={1} className={classes.sidebar}>
        <PublicationSidebar doi={doi} title={title} />
      </Grid>
      <Grid item xs={12} sm={12} md={10}>
        <PublicationBody publication={publication} />
      </Grid>
    </Grid>
  )
}

export { PublicationPage }
