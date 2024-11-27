import React from "react"
import { makeStyles, Box, Typography, Divider, Card } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import { Publication } from "dicty-graphql-schema"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"
import { Authors } from "./Authors"
import { JournalData } from "./JournalData"
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
