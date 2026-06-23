import { Box, Typography } from "@mui/material"
import { dscHomeTheme } from "./dscTheme"
import type { SectionTitleProperties } from "./types"

const SectionTitle = ({ children, id, sx }: SectionTitleProperties) => (
  <Box
    id={id}
    sx={{
      display: "flex",
      alignItems: "center",
      mb: 3,
      ...sx,
    }}>
    <Box
      sx={{
        width: 4,
        height: 32,
        bgcolor: dscHomeTheme.colors.primary,
        borderRadius: dscHomeTheme.borderRadius.sm,
        mr: 2,
      }}
    />
    <Typography
      variant="h3"
      component="h2"
      sx={{
        color: dscHomeTheme.colors.textPrimary,
        fontWeight: 600,
      }}>
      {children}
    </Typography>
  </Box>
)

export { SectionTitle }
