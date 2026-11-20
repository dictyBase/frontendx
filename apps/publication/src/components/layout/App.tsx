import { type ReactNode } from "react"
import { Box, type Theme } from "@mui/material"
import {
  HeaderWithAuth,
  NavbarWithAuth,
  FooterWithAuth,
} from "@dictybase/auth-mui5"
import "@fontsource-variable/playfair-display"
import "@fontsource-variable/inter-tight"

/**
 * App is responsible for the main layout of the entire application.
 */
const App = ({ children }: { children: ReactNode }) => (
  <Box
    sx={(theme: Theme) => ({
      fontSize: "16px",
      color: "#333",
      backgroundColor: "#fff",
      "& h1, h2, h3, h4, h5, h6": {
        fontWeight: 500,
        lineHeight: 1.1,
      },
      "& h4, h5, h6": {
        marginTop: theme.spacing(1.2),
        marginBottom: theme.spacing(1.2),
      },
    })}>
    <HeaderWithAuth
      frontPageUrl={import.meta.env.VITE_FRONTPAGE_URL}
      basename={import.meta.env.VITE_BASENAME}
    />
    <NavbarWithAuth
      frontPageUrl={import.meta.env.VITE_FRONTPAGE_URL}
      stockCenterUrl={import.meta.env.VITE_STOCKCENTER_URL}
    />
    <main>{children}</main>
    <FooterWithAuth
      frontPageUrl={import.meta.env.VITE_FRONTPAGE_URL}
      stockCenterUrl={import.meta.env.VITE_STOCKCENTER_URL}
    />
  </Box>
)

export { App }
