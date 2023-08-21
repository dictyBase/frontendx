import React from "react"
import Grid from "@material-ui/core/Grid"
import { useStyles } from "./homeStyles"

type HomepageColumnProperties = {
  components: Array<React.ReactNode>
}

/**
 * HomepageColumn handles formatting for each column on the homepage.
 */

const HomepageColumn = ({ components }: HomepageColumnProperties) => {
  const classes = useStyles({})
  const content = components.map((item: React.ReactNode, index: number) => (
    // eslint-disable-next-line react/no-array-index-key
    <Grid item key={index}>
      {item}
    </Grid>
  ))

  return (
    <Grid item xs={12} sm={4} className={classes.column}>
      <Grid container direction="column" spacing={1}>
        {content}
      </Grid>
    </Grid>
  )
}

export { HomepageColumn }
