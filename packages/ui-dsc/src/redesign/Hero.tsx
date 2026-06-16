import { Box, Grid, Typography } from "@mui/material"
import { dscHomeTheme } from "./dscTheme"
import { WarningBanner } from "./WarningBanner"
import type { HeroProperties } from "./types"

const Hero = ({ title, children, image, warning, sx }: HeroProperties) => (
  <Box
    sx={{
      bgcolor: dscHomeTheme.colors.background,
      py: 6,
      px: 3,
      borderRadius: dscHomeTheme.borderRadius.lg,
      mb: 4,
      ...sx,
    }}>
    {warning && (
      <WarningBanner sx={{ mb: 3 }}>
        <Typography variant="body2">{warning}</Typography>
      </WarningBanner>
    )}
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={image ? 6 : 12}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: dscHomeTheme.colors.primary,
            fontWeight: 700,
            mb: 2,
          }}>
          {title}
        </Typography>
        <Box sx={{ color: dscHomeTheme.colors.textSecondary }}>{children}</Box>
      </Grid>
      {image && (
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              height: 300,
              bgcolor: dscHomeTheme.colors.cardBackground,
              borderRadius: dscHomeTheme.borderRadius.lg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}>
            {image.src ? (
              <img
                src={image.src}
                alt={image.alt || "Hero image"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Typography variant="body1" color="text.secondary">
                {image.placeholder || "Image placeholder"}
              </Typography>
            )}
          </Box>
        </Grid>
      )}
    </Grid>
  </Box>
)

export { Hero }
