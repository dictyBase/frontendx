import React from "react"
import Grid from "@material-ui/core/Grid"
import { Publication } from "dicty-graphql-schema"
import Head from "next/head"
import { PublicationSidebar } from "./PublicationSidebar"
import { PublicationHeader } from "./PublicationHeader"
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
          <Grid container direction="column">
            <Grid item className={classes.header}>
              <PublicationHeader publication={publication} />
            </Grid>
            <Grid item className={classes.body}>
              <PublicationBody publication={publication} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { PublicationPage }
