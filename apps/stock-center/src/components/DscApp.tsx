import Container from "@material-ui/core/Container"
import { LoadingDisplay } from "@dictybase/ui-dsc"
import { Footer } from "@dictybase/footer"
import { RouterProvider } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Navbar } from "dicty-components-navbar"
import { navbarItems, formatNavbarData } from "../navbarItems"
import { HeaderWithAuth } from "./auth/HeaderWithAuth"
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
      <HeaderWithAuth />
      <Navbar items={formatNavbarData(navbarItems)} theme={navTheme} />
      <main className={classes.main}>
        <Container maxWidth="lg">
          <RouterProvider
            router={dscRouter}
            fallbackElement={<LoadingDisplay rows={6} />}
          />
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export { DscApp }
