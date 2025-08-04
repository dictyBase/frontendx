import { ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { isString } from "fp-ts/string"
import {
  map as Emap,
  match as Ematch,
  fromPredicate as EfromPredicate,
} from "fp-ts/Either"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import ListItem from "@material-ui/core/ListItem"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"
import { characterConverter } from "../utils/characterConverter"
import { useStyles } from "./styles"

type DetailsListitemProperties = {
  /** Type of content to display (i.e. Strain Descriptor, Genotype, etc.) */
  title: string
  /** The actual data for that field */
  content: ReactNode
}

/**
 * DetailsListItem used to display a single row of data for a stock item.
 */

const DetailsListItem = ({ title, content }: DetailsListitemProperties) => {
  const classes = useStyles()

  const display = pipe(
    content,
    EfromPredicate(isString, () => content),
    Emap(characterConverter),
    Emap(parseFormattedStringToDomElements),
    Ematch(
      (original) => original,
      (parsed) => parsed,
    ),
  )

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
