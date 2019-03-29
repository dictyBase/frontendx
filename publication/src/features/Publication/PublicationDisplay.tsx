import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import Title from "./Title"
import Authors from "./Authors"
import JournalData from "./JournalData"
import SocialLinks from "./SocialLinks"
import Abstract from "./Abstract"
import FullTextLinks from "./FullTextLinks"

const styles = createStyles({
  link: {
    textDecoration: "none",
    color: "#020202",
  },
})

interface Props {
  classes: {
    link: string
  }
}

export const PublicationDisplay = (props: Props) => {
  const { classes } = props
  return (
    <Fragment>
      <Title />
      <Authors />
      <JournalData />
      <SocialLinks />
      <Abstract />
      <FullTextLinks />
    </Fragment>
  )
}

export default withStyles(styles)(PublicationDisplay)
