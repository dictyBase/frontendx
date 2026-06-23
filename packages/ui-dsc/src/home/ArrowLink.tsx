import type { ReactNode } from "react"
import { Link as ReactRouterLink } from "react-router-dom"
import type { SxProps, Theme } from "@mui/material"
import { Typography } from "@mui/material"
import { dscHomeTheme } from "./dscTheme"

type ArrowLinkProperties = {
  href: string
  children: ReactNode
  sx?: SxProps<Theme>
}

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
