import { Card, CardContent, Typography } from "@mui/material"
import { dscHomeTheme } from "./dscTheme"
import { gradientBackground } from "./styleHelpers"
import type { StatCardProperties } from "./types"

const StatCard = ({
  number,
  label,
  gradient = [dscHomeTheme.colors.primary, dscHomeTheme.colors.primaryLight],
  sx,
}: StatCardProperties) => (
  <Card
    elevation={0}
    sx={{
      p: 3,
      borderRadius: dscHomeTheme.borderRadius.lg,
      background: gradientBackground(gradient[0], gradient[1]),
      color: "#fff",
      textAlign: "center",
      boxShadow: dscHomeTheme.shadows.card,
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: dscHomeTheme.shadows.cardHover,
      },
      ...sx,
    }}>
    <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
      <Typography variant="h3" component="div" sx={{ fontWeight: 700, mb: 1 }}>
        {number}
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.95 }}>
        {label}
      </Typography>
    </CardContent>
  </Card>
)

export { StatCard }
