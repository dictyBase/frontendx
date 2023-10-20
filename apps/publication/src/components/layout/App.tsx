import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "@dictybase/navbar"
import jwtDecode from "jwt-decode"
import { useFetchRefreshToken, useFetch } from "dicty-hooks"
import {
  useGetRefreshTokenQuery,
  GetRefreshTokenQuery,
  User,
} from "dicty-graphql-schema"
import { useAuthStore, ActionType } from "../auth/AuthStore"
import ErrorBoundary from "../errors/ErrorBoundary"
import { headerItems, loggedHeaderItems, HeaderLinks } from "./HeaderItems"
import {
  footerLinks,
  footerURL,
  convertFooterData,
  FooterItems,
} from "../../common/utils/footerItems"
import { navTheme, headerTheme, footerTheme } from "../../common/utils/themes"
import {
  navbarItems,
  NavbarItems,
  navbarURL,
  formatNavbarData,
} from "../../common/utils/navbarItems"

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
  data: GetRefreshTokenQuery["getRefreshToken"],
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
    return
  }
  const decodedToken = jwtDecode(token) as any
  const currentTime = new Date(Date.now())
  const jwtTime = new Date(decodedToken.exp * 1000)
  const timeDiffInMins = (+jwtTime - +currentTime) / 60_000
  // all this to say we want the delay to be two minutes before the JWT expires
  // eslint-disable-next-line consistent-return
  return (timeDiffInMins - 2) * 60 * 1000
}

/**
 * App is responsible for the main layout of the entire application.
 */
const App = ({ children }: { children: React.ReactNode }) => {
  const [skip, setSkip] = React.useState(false)
  const {
    state: { token, isAuthenticated },
    dispatch,
  } = useAuthStore()
  const navbar = useFetch<NavbarItems>(navbarURL, navbarItems)
  const footer = useFetch<FooterItems>(footerURL, footerLinks)
  const classes = useStyles()
  const { loading, refetch, data } = useGetRefreshTokenQuery({
    variables: { token },
    errorPolicy: "ignore",
    fetchPolicy: "no-cache",
    nextFetchPolicy: "no-cache",
    skip, // only run query once
  })
  const interval = React.useRef(null)
  const delay = getTokenIntervalDelayInMS(token)

  // set skip to true so the query is only run once
  // then update the refresh token in our global state
  React.useEffect(() => {
    if (!loading && data && data.getRefreshToken) {
      setSkip(true)
      updateToken(dispatch, data.getRefreshToken)
    }
  }, [data, dispatch, loading])

  const fetchRefreshToken = React.useCallback(async () => {
    try {
      const response = await refetch({ token })
      if (response.data.getRefreshToken) {
        const { data: _data } = response
        updateToken(dispatch, _data.getRefreshToken)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }, [dispatch, refetch, token])
  useFetchRefreshToken(fetchRefreshToken, interval, delay!, isAuthenticated)

  const headerContent = isAuthenticated ? loggedHeaderItems : headerItems

  return (
    <div className={classes.body}>
      <Header items={headerContent} render={HeaderLinks} theme={headerTheme} />
      <Navbar items={formatNavbarData(navbar.data)} theme={navTheme} />
      <main className={classes.main}>
        <Container>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Container>
      </main>
      {footer.data?.data && (
        <Footer
          links={convertFooterData(footer.data.data)}
          theme={footerTheme}
        />
      )}
    </div>
  )
}

export { App }
