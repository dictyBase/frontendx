import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { HeaderWithAuth, NavbarWithAuth, FooterWithAuth } from "@dictybase/auth"
import { ErrorBoundary } from "components/errors/ErrorBoundary"
import { navTheme } from "common/utils/themes"

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
 * App is responsible for the main layout of the entire application.
 */

const App = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles()
  return (
    <div className={classes.body}>
      <HeaderWithAuth
        frontPageUrl={process.env.NEXT_PUBLIC_FRONTPAGE_URL}
        basename={process.env.NEXT_PUBLIC_BASENAME}
      />
      <NavbarWithAuth
        frontPageUrl={process.env.NEXT_PUBLIC_FRONTPAGE_URL}
        stockCenterUrl={process.env.NEXT_PUBLIC_STOCKCENTER_URL}
        theme={navTheme}
      />
      <main className={classes.main}>
        <Container maxWidth="xl">
          <ErrorBoundary>{children}</ErrorBoundary>
        </Container>
      </main>
      <FooterWithAuth
        frontPageUrl={process.env.NEXT_PUBLIC_FRONTPAGE_URL}
        stockCenterUrl={process.env.NEXT_PUBLIC_STOCKCENTER_URL}
      />
    </div>
  )
}

export { App }
