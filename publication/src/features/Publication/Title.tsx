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

export const Title = (props: Props) => {
  const { classes } = props
  return <div>Publication Title</div>
}

export default withStyles(styles)(Title)
