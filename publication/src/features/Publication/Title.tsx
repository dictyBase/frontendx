import React from "react"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"

const styles = createStyles({
  title: {
    padding: 0,
  },
})

interface Props {
  classes: {
    title: string
  }
}

/**
 * Title displays the title of the publication.
 */

export const Title = (props: Props) => {
  const { classes } = props
  return (
    <div className={classes.title}>
      <h2>
        This is a fake publication title that should be at least ten words
      </h2>
    </div>
  )
}

export default withStyles(styles)(Title)
