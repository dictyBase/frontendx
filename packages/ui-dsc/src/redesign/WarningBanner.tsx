import { Box } from "@mui/material"
import { dscHomeTheme } from "./dscTheme"
import type { WarningBannerProperties } from "./types"

const WarningBanner = ({ children, sx }: WarningBannerProperties) => (
  <Box
    sx={{
      bgcolor: dscHomeTheme.colors.warningLight,
      color: dscHomeTheme.colors.textPrimary,
      p: 2,
      borderRadius: dscHomeTheme.borderRadius.md,
      border: `1px solid ${dscHomeTheme.colors.warning}`,
      ...sx,
    }}>
    {children}
  </Box>
)

export { WarningBanner }
