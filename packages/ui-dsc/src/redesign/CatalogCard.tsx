import { Box, Card, CardContent, Typography } from "@mui/material"
import { dscHomeTheme } from "./dscTheme"
import { ArrowLink } from "./ArrowLink"
import type { CatalogCardProperties } from "./types"

const CatalogCard = ({
  icon,
  title,
  description,
  href,
  external = false,
  linkText = "Explore →",
  sx,
}: CatalogCardProperties) => (
  <Card
    elevation={0}
    sx={{
      p: 3,
      borderRadius: dscHomeTheme.borderRadius.lg,
      transition: "all 0.3s ease",
      border: "2px solid transparent",
      bgcolor: dscHomeTheme.colors.cardBackground,
      boxShadow: dscHomeTheme.shadows.card,
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: dscHomeTheme.shadows.cardHover,
        borderColor: dscHomeTheme.colors.primary,
      },
      ...sx,
    }}>
    <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
      <Box
        sx={{
          width: 60,
          height: 60,
          background: `linear-gradient(135deg, ${dscHomeTheme.colors.primary}, ${dscHomeTheme.colors.primaryLight})`,
          borderRadius: dscHomeTheme.borderRadius.lg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.8rem",
          mb: 2,
        }}>
        {icon}
      </Box>
      <Typography
        variant="h5"
        sx={{ mb: 1, color: dscHomeTheme.colors.primary, fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
      <ArrowLink href={href} external={external}>
        {linkText}
      </ArrowLink>
    </CardContent>
  </Card>
)

export { CatalogCard }
