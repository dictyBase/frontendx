import { makeBy as AmakeBy } from "fp-ts/Array"
import { Box, Paper, Skeleton } from "@mui/material"
import { blue } from "@mui/material/colors"

/**
 * Loader is the default loading skeleton component.
 */
const Loader = ({ rows = 12 }: { rows?: number }) => (
  <Paper sx={{ backgroundColor: blue[50], padding: "1rem" }}>
    <Box data-testid="skeleton-loader">
      {AmakeBy(rows, (key) => (
        <Skeleton height={50} key={key} animation="wave" />
      ))}
    </Box>
  </Paper>
)

export { Loader }
