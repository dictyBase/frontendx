import Container from "@material-ui/core/Container"
import { LoadingDisplay } from "@dictybase/ui-dsc"
import { RouterProvider } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { HeaderWithAuth, NavbarWithAuth, FooterWithAuth } from "@dictybase/auth"
import { dscRouter } from "../routes"
import { navTheme } from "../themes"

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
  const classes = useStyles()
  return (
    <div className={classes.body}>
      <HeaderWithAuth clientRouter={dscRouter} />
      <NavbarWithAuth
        frontPageUrl={import.meta.env.VITE_APP_FRONTPAGE_URL}
        stockCenterUrl={import.meta.env.VITE_APP_STOCKCENTER_URL}
        theme={navTheme}
      />
      <main className={classes.main}>
        <Container maxWidth="lg">
          <RouterProvider
            router={dscRouter}
            fallbackElement={<LoadingDisplay rows={6} />}
          />
        </Container>
      </main>
      <FooterWithAuth />
    </div>
  )
}

export { DscApp }
