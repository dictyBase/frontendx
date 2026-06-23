import type { SxProps } from "@mui/material"
import { dscHomeTheme } from "./dscTheme"

export const cardBaseStyles: SxProps = {
  p: 3,
  borderRadius: dscHomeTheme.borderRadius.lg,
  bgcolor: dscHomeTheme.colors.cardBackground,
  boxShadow: dscHomeTheme.shadows.card,
  transition: "all 0.3s ease",
}

export const cardHoverStyles: SxProps = {
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: dscHomeTheme.shadows.cardHover,
  },
}

export const gradientBackground = (from: string, to: string) =>
  `linear-gradient(135deg, ${from}, ${to})`
