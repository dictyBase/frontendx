import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Footer, footerData } from "@dictybase/footer"
import { Header } from "@dictybase/header"
import { Navbar } from "dicty-components-navbar"
import jwtDecode from "jwt-decode"
import { useFetch } from "dicty-hooks"
import {
  useGetRefreshTokenQuery,
  GetRefreshTokenQuery,
  User,
} from "dicty-graphql-schema"
import {
  useAuthStore,
  ActionType,
} from "../../features/Authentication/AuthStore"
import ErrorBoundary from "../../common/components/errors/ErrorBoundary"
import {
  navbarItems,
  NavbarItems,
  navbarURL,
  formatNavbarData,
} from "../../common/utils/navbarItems"
import { navTheme } from "../../common/utils/themes"
import Routes from "../routes/Routes"

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

type Action = {
  type: ActionType.UPDATE_TOKEN
  payload: {
    provider: string
    token: string
    user: User
  }
}

const updateToken = (
  dispatch: (argument0: Action) => void,
  data: GetRefreshTokenQuery["refreshToken"],
) =>
  dispatch({
    type: ActionType.UPDATE_TOKEN,
    payload: {
      provider: data?.identity.provider as string,
      token: data?.token as string,
      user: data?.user as User,
    },
  })

const getTokenIntervalDelayInMS = (token: string) => {
  if (token === "") {
    return 0
  }
  const decodedToken = jwtDecode(token) as any
  const currentTime = new Date(Date.now())
  const jwtTime = new Date(decodedToken.exp * 1000)
  const timeDiffInMins = (+jwtTime - +currentTime) / 60_000
  // all this to say we want the delay to be two minutes before the JWT expires
  return (timeDiffInMins - 2) * 60 * 1000
}

/**
 * App is responsible for the main layout of the entire application.
 */

const App = () => {
  const [skip, setSkip] = React.useState(false)
  const {
    state: { token },
    dispatch,
  } = useAuthStore()
  const navbar = useFetch<NavbarItems>(navbarURL, navbarItems)
  const classes = useStyles()
  const { loading, data } = useGetRefreshTokenQuery({
    variables: { token },
    errorPolicy: "ignore",
    fetchPolicy: "no-cache",
    nextFetchPolicy: "no-cache",
    skip, // only run query once
  })
  // set skip to true so the query is only run once
  // then update the refresh token in our global state
  React.useEffect(() => {
    if (!loading && data && data.refreshToken) {
      setSkip(true)
      updateToken(dispatch, data.refreshToken)
    }
  }, [data, dispatch, loading])

  return (
    <div className={classes.body}>
      <Header />
      <Navbar items={formatNavbarData(navbar.data)} theme={navTheme} />
      <main className={classes.main}>
        <Container maxWidth="xl">
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export { App, getTokenIntervalDelayInMS }
