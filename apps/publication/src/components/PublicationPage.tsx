import React from "react"
import { makeStyles, Grid, Container, Box } from "@material-ui/core"
import { grey } from "@material-ui/core/colors"
import { Publication } from "dicty-graphql-schema"
import Head from "next/head"
import { PublicationSidebar } from "./PublicationSidebar"
import { PublicationBody } from "./PublicationBody"

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: grey[100],
  },
  foregrond: {
    backgroundColor: "white",
    boxShadow: `2px 2px 7px ${grey[300]}, -2px 2px 7px ${grey[300]}`,
  },
  sidebar: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}))

interface PublicationPageProperties {
  publication: Publication
}

const PublicationPage = ({ publication }: PublicationPageProperties) => {
  const classes = useStyles()
  const { title, doi } = publication
  return (
    <Box className={classes.background}>
      <Container disableGutters className={classes.foreground}>
        <Grid container>
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
      </Container>
    </Box>
  )
}

export { PublicationPage }
