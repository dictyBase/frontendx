import { Header } from "@dictybase/header"
import { LoginButton } from "./LoginButton"
import { LogoutButton } from "./LogoutButton"
import { match, P } from "ts-pattern"
import { useLogto } from "@logto/react"
import { callbackPath, homePath } from "../../routes"

type logtoHookProperties = {
  error: Error | undefined
  isAuthenticated: boolean
  isLoading: boolean
}

const loginHandler = (url: string) => <LoginButton url={url} />
const logoutHandler = (url: string) => <LogoutButton url={url} />
const conditonalHandler = (logtoCase: logtoHookProperties) => {
  return match(logtoCase)
    .with(
      P.when(({ isAuthenticated }) => isAuthenticated),
      () => <Header LoginOut={logoutHandler(homePath)} />,
    )
    .otherwise(() => <Header LoginOut={loginHandler(callbackPath)} />)
}

const HeaderWithAuth = () => {
  const { isAuthenticated, isLoading, error } = useLogto()
  return conditonalHandler({ isAuthenticated, isLoading, error })
}

export { HeaderWithAuth }
