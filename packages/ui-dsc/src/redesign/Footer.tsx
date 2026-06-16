import { Box, Typography } from "@mui/material"
import { dscHomeTheme } from "./dscTheme"
import type { FooterProperties } from "./types"

const Footer = ({ title, subtitle, sx }: FooterProperties) => (
  <Box
    component="footer"
    sx={{
      bgcolor: dscHomeTheme.colors.primary,
      color: "#fff",
      py: 4,
      px: 3,
      mt: 6,
      textAlign: "center",
      ...sx,
    }}>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: subtitle ? 1 : 0 }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body2" sx={{ opacity: 0.9 }}>
        {subtitle}
      </Typography>
    )}
  </Box>
)

export { Footer }
