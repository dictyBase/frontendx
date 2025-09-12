import { FunctionComponent } from "react"
import { Box } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import {
  HeaderWithAuth,
  NavbarWithAuth,
  FooterWithAuth,
} from "@dictybase/auth-mui5"
import ErrorBoundary from "../errors/ErrorBoundary"
import { navTheme } from "../../common/utils/themes"
import { useGoogleAnalytics } from "../../common/hooks/useGoogleAnalytics"
import "@fontsource-variable/playfair-display"
import "@fontsource-variable/inter-tight"

const useStyles = makeStyles((theme: Theme) => ({
  body: {
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
  },
}))

/**
 * App is responsible for the main layout of the entire application.
 */
const App: FunctionComponent = ({ children }) => {
  const classes = useStyles()
  useGoogleAnalytics()

  return (
    <Box className={classes.body}>
      <HeaderWithAuth
        frontPageUrl={import.meta.env.VITE_FRONTPAGE_URL}
        basename={import.meta.env.VITE_BASENAME}
      />
      <NavbarWithAuth
        frontPageUrl={import.meta.env.VITE_FRONTPAGE_URL}
        stockCenterUrl={import.meta.env.VITE_STOCKCENTER_URL}
        theme={navTheme}
      />
      <main>
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <FooterWithAuth
        frontPageUrl={import.meta.env.VITE_FRONTPAGE_URL}
        stockCenterUrl={import.meta.env.VITE_STOCKCENTER_URL}
      />
    </Box>
  )
}

export { App }
