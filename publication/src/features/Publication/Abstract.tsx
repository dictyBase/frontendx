import React from "react"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"

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

export const Abstract = (props: Props) => {
  const { classes } = props
  return <div>Publication Abstract</div>
}

export default withStyles(styles)(Abstract)
