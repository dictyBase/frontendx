import React from "react"
import Grid from "@material-ui/core/Grid"
import { Publication } from "dicty-graphql-schema"
import Head from "next/head"
import { PublicationSidebar } from "./PublicationSidebar"
import { PublicationBody } from "./PublicationBody"
import { useStyles } from "./useStyles"

interface PublicationPageProperties {
  publication: Publication
}

const PublicationPage = ({ publication }: PublicationPageProperties) => {
  const classes = useStyles()
  const { title, doi } = publication
  return (
    <>
      <Head>
        <title>dictyBase Literature - {title}</title>
        <meta
          name="description"
          content={`dictyBase literature page for title ${title}`}
        />
      </Head>
      <Grid container direction="row">
        <Grid item md={1} className={classes.sidebar}>
          <PublicationSidebar doi={doi} title={title} />
        </Grid>
        <Grid item md={11}>
          <PublicationBody publication={publication} />
        </Grid>
      </Grid>
    </>
  )
}

export { PublicationPage }
