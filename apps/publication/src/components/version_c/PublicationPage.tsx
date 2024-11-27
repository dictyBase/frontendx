import React from "react"
import { Box, Container } from "@material-ui/core"
import { Publication } from "dicty-graphql-schema"
import Head from "next/head"
import { PublicationBody } from "./PublicationBody"
import { useStyles } from "./useStyles"

interface PublicationPageProperties {
  publication: Publication
}

const PublicationPage = ({ publication }: PublicationPageProperties) => {
  const classes = useStyles()
  const { title } = publication
  return (
    <Box className={classes.background}>
      <Container className={classes.foreground}>
        <Head>
          <title>dictyBase Literature - {title}</title>
          <meta
            name="description"
            content={`dictyBase literature page for title ${title}`}
          />
        </Head>
        <PublicationBody publication={publication} />
      </Container>
    </Box>
  )
}

export { PublicationPage }
