import { RouterProvider } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { HeaderWithAuth, NavbarWithAuth, FooterWithAuth } from "@dictybase/auth"
import { router } from "./routes"
import { navTheme } from "./utils/themes"

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

/**
 * Layout is responsible for the main layout of the entire application.
 */

const Layout = () => {
  const classes = useStyles()

  return (
    <div className={classes.body}>
      <HeaderWithAuth
        frontPageUrl={import.meta.env.VITE_APP_FRONTPAGE_URL}
        basename={import.meta.env.VITE_APP_BASENAME}
      />
      <NavbarWithAuth
        frontPageUrl={import.meta.env.VITE_APP_FRONTPAGE_URL}
        stockCenterUrl={import.meta.env.VITE_APP_STOCKCENTER_URL}
        theme={navTheme}
      />
      <main className={classes.main}>
        <Container maxWidth="xl">
          <RouterProvider router={router} />
        </Container>
      </main>
      <FooterWithAuth
        frontPageUrl={import.meta.env.VITE_APP_FRONTPAGE_URL}
        stockCenterUrl={import.meta.env.VITE_APP_STOCKCENTER_URL}
      />
    </div>
  )
}

export { Layout }
