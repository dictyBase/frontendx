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
}

const authors = [
  {
    first_name: "George",
    last_name: "Costanza",
    full_name: "Costanza G",
    initials: "GC",
  },
  {
    first_name: "Cosmo",
    last_name: "Kramer",
    full_name: "Kramer C",
    initials: "CK",
  },
]

/**
 * Authors displays an inline list of the authors of the publication.
 */

export const Authors = (props: Props) => {
  const { classes } = props
  return (
    <div className={classes.section}>
      {authors.map((author, index) => (
        <span key={index}>{(index ? ", " : "") + author.full_name}</span>
      ))}
    </div>
  )
}

export default withStyles(styles)(Authors)
