import React from "react"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"

const styles = createStyles({
  section: {
    paddingBottom: "15px",
  },
})

interface Props {
  classes: {
    section: string
  }
  authors: Array<{
    first_name?: string
    last_name: string
    rank?: string
    initials: string
  }>
}
/**
 * Authors displays an inline list of the authors of the publication.
 */

export const Authors = (props: Props) => {
  const { classes, authors } = props
  return (
    <div className={classes.section}>
      {authors.map((author, index) => (
        <span key={index}>
          {(index ? ", " : "") + author.last_name + " " + author.initials}
        </span>
      ))}
    </div>
  )
}

export default withStyles(styles)(Authors)
