import Grid from "@mui/material/Grid"
import Typography, { TypographyProps } from "@mui/material/Typography"

type CartTotalRowProperties = {
  /** Left value to display (i.e. Strains, Plasmids, Total) */
  leftValue: string
  /** Number of items in cart */
  numItems: number
  /** Total of these items */
  total: string
  /** Typography variant prop */
  variant?: TypographyProps["variant"]
}

/**
 * ShoppingCartTotalRow displays a single row used inside the total card.
 */
const CartTotalRow = ({
  leftValue,
  numItems,
  total,
  variant = "inherit",
}: CartTotalRowProperties) => (
  <Grid container sx={{ paddingBottom: 2 }}>
    <Grid item xs={10}>
      <Typography variant={variant} component="span">
        <strong>{leftValue}</strong> &nbsp;
      </Typography>
      <Typography variant={variant} component="span">
        {`${numItems} ${numItems === 1 ? "item" : "items"}`}:
      </Typography>
    </Grid>
    <Grid item xs={2} container justifyContent="flex-end">
      <Typography variant={variant} component="span">
        {total}
      </Typography>
    </Grid>
  </Grid>
)

export { CartTotalRow }
