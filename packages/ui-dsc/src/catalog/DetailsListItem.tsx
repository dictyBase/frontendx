import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import ListItem from "@material-ui/core/ListItem"
import { characterConverter } from "../utils/characterConverter"
import { useStyles } from "./styles"

type DetailsListitemProperties = {
  /** Type of content to display (i.e. Strain Descriptor, Genotype, etc.) */
  title: string
  /** The actual data for that field */
  content: string | JSX.Element | JSX.Element[] | undefined | null
}

/**
 * DetailsListItem used to display a single row of data for a stock item.
 */

const DetailsListItem = ({ title, content }: DetailsListitemProperties) => {
  const classes = useStyles()

  let display = content
  if (typeof display === "string") {
    // convert any html entities
    display = characterConverter(display)
  }

  return (
    <ListItem className={classes.details} divider>
      <Grid item xs={12} sm={3} className={classes.listItem}>
        <Typography
          component="span"
          variant="body2"
          className={classes.detailsItem}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Typography component="span" variant="body1">
          {display}
        </Typography>
      </Grid>
    </ListItem>
  )
}

export { DetailsListItem }
