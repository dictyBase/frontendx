import React from "react"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"

const styles = createStyles({
  section: {
    paddingBottom: "5px",
  },
})

interface Props {
  classes: {
    section: string
  }
  abstract: string
}

/**
 * Abstract displays the abstract of the publication.
 */

export const Abstract = (props: Props) => {
  const { classes, abstract } = props
  return (
    <div className={classes.section}>
      <h2>Abstract</h2>
      <hr />
      {abstract}
    </div>
  )
}

export default withStyles(styles)(Abstract)
