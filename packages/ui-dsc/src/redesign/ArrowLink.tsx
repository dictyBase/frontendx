import { Link } from "@mui/material"
import { dscHomeTheme } from "./dscTheme"
import type { ArrowLinkProperties } from "./types"

const ArrowLink = ({
  href,
  children,
  external = false,
  sx,
}: ArrowLinkProperties) => (
  <Link
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    underline="none"
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
    {children}
  </Link>
)

export { ArrowLink }
