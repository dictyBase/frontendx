import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { grey } from "@mui/material/colors"
import { match as Bmatch } from "fp-ts/boolean"
import { pipe } from "fp-ts/function"

type AvailabilityIndicatorProperties = {
  /** Whether the stock item is currently in stock. */
  inStock: boolean
}

/**
 * Renders a coloured dot and label showing whether a stock item is
 * currently available, out of stock, or already in the cart. Used in
 * the header of a {@link CatalogListItem}.
 *
 * @param inStock - Whether the item is currently in stock.
 * @param inCart  - Whether the item is already in the user's cart.
 */
const AvailabilityIndicator = ({
  inStock,
}: AvailabilityIndicatorProperties) => {
  const color = pipe(
    inStock,
    Bmatch(
      () => grey[600],
      () => "success.main",
    ),
  )
  const label = pipe(
    inStock,
    Bmatch(
      () => "Out of stock",
      () => "Available",
    ),
  )

  return (
    <Stack direction="row" alignItems="center" gap={0.75}>
      <Box
        component="span"
        aria-hidden
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
      <Typography
        component="span"
        sx={{ color, fontSize: "0.8rem", fontWeight: 600 }}>
        {label}
      </Typography>
    </Stack>
  )
}

export { AvailabilityIndicator }
export type { AvailabilityIndicatorProperties }
