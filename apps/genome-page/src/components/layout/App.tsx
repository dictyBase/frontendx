import { ReactNode } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Container, Box } from "@material-ui/core"
import {
  HeaderWithAuth,
  NavbarWithAuth,
  FooterWithAuth,
} from "@dictybase/auth-mui5"
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

const App = ({ children }: { children: NonNullable<ReactNode> }) => {
  const classes = useStyles()
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
      <main className={classes.main}>
        <Container maxWidth="xl">{children}</Container>
      </main>
      <FooterWithAuth
        frontPageUrl={import.meta.env.VITE_FRONTPAGE_URL}
        stockCenterUrl={import.meta.env.VITE_STOCKCENTER_URL}
      />
    </Box>
  )
}

export { App }
