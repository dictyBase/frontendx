import type { ReactNode } from "react"
import type { SxProps, Theme } from "@mui/material"
import { Box } from "@mui/material"

type GridLayoutProperties = {
  children: ReactNode
  minColumnWidth: string
  gap?: number
  sx?: SxProps<Theme>
}

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
