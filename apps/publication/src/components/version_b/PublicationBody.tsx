import React from "react"
import { makeStyles, Card } from "@material-ui/core"
import { Publication } from "dicty-graphql-schema"
import { Abstract } from "./Abstract"

const useStyles = makeStyles((theme) => ({
  body: {
    padding: theme.spacing(3),
    backgroundColor: "white",
    fontFamily: "'Inter Variable', sans-serif",
  },
}))

interface PublicationBodyProperties {
  publication: Publication
}

const PublicationBody = ({ publication }: PublicationBodyProperties) => {
  const classes = useStyles()
  return (
    <Card elevation={12} className={classes.body}>
      <Abstract abstract={publication.abstract} />
    </Card>
  )
}

export { PublicationBody }
