import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Typography, { TypographyProps } from "@material-ui/core/Typography"
import { StrainItems } from "../types"
import { getCartTotal } from "../utils/getCartTotal"

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(2),
  },
}))

type ShoppingCartTotalRowProperties = {
  /** Left value to display (i.e. Strains, Plasmids, Total) */
  leftValue: string
  /** Items in the cart */
  items: StrainItems
  /** Typography variant prop */
  variant: TypographyProps["variant"]
}

/**
 * ShoppingCartTotalRow displays a single row used inside the total card.
 */
const CartTotalRow = ({
  leftValue,
  items,
  variant = "inherit",
}: ShoppingCartTotalRowProperties) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item xs={10}>
        <Typography variant={variant} component="span">
          <strong>{leftValue}</strong> &nbsp;
        </Typography>
        <Typography variant={variant} component="span">
          ({items.length} {items.length > 1 ? "items" : "item"}):
        </Typography>
      </Grid>
      <Grid item xs={2} container justifyContent="flex-end">
        <Typography variant={variant} component="span">
          {getCartTotal(items)}
        </Typography>
      </Grid>
    </Grid>
  )
}

export { CartTotalRow }
