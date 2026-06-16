import { Box } from "@mui/material"
import type { GridLayoutProperties } from "./types"

const GridLayout = ({
  children,
  minColumnWidth,
  gap = 3,
  sx,
}: GridLayoutProperties) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`,
      gap,
      ...sx,
    }}>
    {children}
  </Box>
)

export { GridLayout }
