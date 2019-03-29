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

const data =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non ipsum dolor. Cras consectetur luctus neque, nec facilisis magna rutrum non. Praesent gravida volutpat dolor sagittis porttitor. Sed ut turpis neque. In non libero vel ipsum bibendum lobortis. Nullam congue molestie nulla a sodales. Suspendisse eget faucibus nunc. Suspendisse a finibus elit. Sed at vulputate lorem. Ut pretium, ligula sit amet iaculis elementum, sem eros vehicula metus, malesuada lacinia dolor massa id massa. "

/**
 * Abstract displays the abstract of the publication.
 */

export const Abstract = (props: Props) => {
  const { classes } = props
  return (
    <div className={classes.section}>
      <h2>Abstract</h2>
      <hr />
      {data}
    </div>
  )
}

export default withStyles(styles)(Abstract)
