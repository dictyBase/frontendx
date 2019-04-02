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
  title: string
}

/**
 * Title displays the title of the publication.
 */

export const Title = (props: Props) => {
  const { classes, title } = props
  return (
    <div className={classes.title}>
      <h2>{title}</h2>
    </div>
  )
}

export default withStyles(styles)(Title)
