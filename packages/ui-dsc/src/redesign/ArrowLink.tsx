import { Link as ReactRouterLink } from "react-router-dom"
import { Typography } from "@mui/material"
import { dscHomeTheme } from "./dscTheme"
import type { ArrowLinkProperties } from "./types"

const ArrowLink = ({ href, children, sx }: ArrowLinkProperties) => (
  <Typography
    sx={{
      color: dscHomeTheme.colors.primary,
      fontWeight: 500,
      display: "inline-flex",
      alignItems: "center",
      transition: "all 0.2s ease",
      "&:hover": {
        color: dscHomeTheme.colors.primaryLight,
        transform: "translateX(4px)",
      },
      ...sx,
    }}>
    <ReactRouterLink to={href}>{children}</ReactRouterLink>
  </Typography>
)

export { ArrowLink }
