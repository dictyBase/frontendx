import { Suspense } from "react"
import { RouterProvider } from "react-router-dom"
import { Box } from "@mui/material"
import { Theme } from "@mui/material/styles"
import { makeStyles } from "tss-react/mui"
import {
  HeaderWithAuth,
  NavbarWithAuth,
  FooterWithAuth,
} from "@dictybase/auth-mui5"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { useGoogleAnalytics } from "../../common/hooks/useGoogleAnalytics"
import { frontpageRouter } from "../../routes"

const useStyles = makeStyles()((theme: Theme) => ({
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
  const { classes } = useStyles()

  return (
    <Box className={classes.body}>
      <HeaderWithAuth
        frontPageUrl={import.meta.env.VITE_APP_FRONTPAGE_URL}
        basename={import.meta.env.VITE_APP_BASENAME}
      />
      <NavbarWithAuth
        frontPageUrl={import.meta.env.VITE_APP_FRONTPAGE_URL}
        stockCenterUrl={import.meta.env.VITE_APP_STOCKCENTER_URL}
      />
      <Suspense fallback={<FullPageLoadingDisplay />}>
        <main>
          <RouterProvider router={frontpageRouter} />
        </main>
      </Suspense>
      <FooterWithAuth
        frontPageUrl={import.meta.env.VITE_APP_FRONTPAGE_URL}
        stockCenterUrl={import.meta.env.VITE_APP_STOCKCENTER_URL}
      />
    </Box>
  )
}

export { FrontPageApp }
