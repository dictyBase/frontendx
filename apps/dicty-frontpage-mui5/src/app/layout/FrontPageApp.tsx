import { RouterProvider } from "react-router-dom"
import { Box } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { HeaderWithAuth, NavbarWithAuth, FooterWithAuth } from "@dictybase/auth"
import { useGoogleAnalytics } from "../../common/hooks/useGoogleAnalytics"
import { ErrorBoundary } from "../../common/components/errors/ErrorBoundary"
import { frontpageRouter } from "../../routes"
import { navTheme } from "../../common/utils/themes"

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

const FrontPageApp = () => {
  useGoogleAnalytics()
  const classes = useStyles()

  return (
    <Box className={classes.body}>
      <HeaderWithAuth
        frontPageUrl={import.meta.env.VITE_APP_FRONTPAGE_URL}
        basename={import.meta.env.VITE_APP_BASENAME}
      />
      <NavbarWithAuth
        frontPageUrl={import.meta.env.VITE_APP_FRONTPAGE_URL}
        stockCenterUrl={import.meta.env.VITE_APP_STOCKCENTER_URL}
        theme={navTheme}
      />
      <main>
        <ErrorBoundary>
          <RouterProvider router={frontpageRouter} />
        </ErrorBoundary>
      </main>
      <FooterWithAuth
        frontPageUrl={import.meta.env.VITE_APP_FRONTPAGE_URL}
        stockCenterUrl={import.meta.env.VITE_APP_STOCKCENTER_URL}
      />
    </Box>
  )
}

export { FrontPageApp }
