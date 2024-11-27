import React from "react"
import { makeStyles, Box, Typography } from "@material-ui/core"
import { blue, indigo, cyan, teal } from "@material-ui/core/colors"
import { Publication } from "dicty-graphql-schema"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"
import { Authors } from "./Authors"
import { JournalData } from "./JournalData"
import { Abstract } from "./Abstract"

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  title: {
    fontFamily: "'Inter Tight Variable', sans-serif",
    color: "white",
    border: "1px solid white",
    padding: theme.spacing(1.5),
    textShadow: "1px 1px black",
  },
  titleBox: {
    backgroundColor: "rgb(0, 68, 102)",
    padding: theme.spacing(1.5),
    // boxShadow: "2px 2px 2px
  },
}))

interface PublicationBodyProperties {
  publication: Publication
}

const PublicationBody = ({ publication }: PublicationBodyProperties) => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box mb={2} className={classes.titleBox}>
        <Typography variant="h1" className={classes.title}>
          {parseFormattedStringToDomElements(publication.title)}
        </Typography>
      </Box>
      <Authors authors={publication.authors} />
      <JournalData data={publication} />
      <Abstract abstract={publication.abstract} />
    </Box>
  )
}

export { PublicationBody }
