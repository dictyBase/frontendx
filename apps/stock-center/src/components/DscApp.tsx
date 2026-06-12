import { Suspense } from "react"
import { Container, Box } from "@material-ui/core"
import { LoadingDisplay } from "@dictybase/ui-dsc"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { RouterProvider } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import {
  HeaderWithAuth,
  NavbarWithAuth,
  FooterWithAuth,
} from "@dictybase/auth-mui5"
import { dscRouter } from "../routes"
import { useGoogleAnalytics } from "../hooks/useGoogleAnalytics"

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
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

const DscApp = () => {
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
      />
      <main className={classes.main}>
        <Container maxWidth="lg">
          <Suspense fallback={FullPageLoadingDisplay}>
            <RouterProvider router={dscRouter} />
          </Suspense>
        </Container>
      </main>
      <FooterWithAuth
        frontPageUrl={import.meta.env.VITE_APP_FRONTPAGE_URL}
        stockCenterUrl={import.meta.env.VITE_APP_STOCKCENTER_URL}
      />
    </Box>
  )
}

export { DscApp }
