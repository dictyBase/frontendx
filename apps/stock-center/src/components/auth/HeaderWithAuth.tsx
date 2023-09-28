import { Header } from "@dictybase/header"
import { match, P } from "ts-pattern"
import { useLogto, UserInfoResponse } from "@logto/react"
import { useState, useEffect } from "react"
import { LoginButton } from "./LoginButton"
import { LogoutButton } from "./LogoutButton"
import { callbackPath, homePath } from "../../routes"

type logtoHookProperties = {
  error: Error | undefined
  isAuthenticated: boolean
  isLoading: boolean
  user?: UserInfoResponse
}

const loginHandler = (url: string) => <LoginButton url={url} />
const logoutHandler = (url: string, user?: UserInfoResponse) => (
  <LogoutButton url={url} user={user as UserInfoResponse} />
)
const conditonalHandler = (logtoCase: logtoHookProperties) =>
  match(logtoCase)
    .with(
      P.when(({ isAuthenticated, user }) =>
        isAuthenticated && user ? isAuthenticated : false,
      ),
      ({ user }) => <Header LoginOut={logoutHandler(homePath, user)} />,
    )
    .otherwise(() => <Header LoginOut={loginHandler(callbackPath)} />)

const HeaderWithAuth = () => {
  const { isAuthenticated, isLoading, error, fetchUserInfo } = useLogto()
  const [user, setUser] = useState<UserInfoResponse>()
  useEffect(() => {
    const handleUserInformation = async () => {
      if (isAuthenticated) {
        const authUser = await fetchUserInfo()
        setUser(authUser)
      }
    }
    handleUserInformation()
  }, [fetchUserInfo, isAuthenticated])
  return conditonalHandler({
    isAuthenticated,
    isLoading,
    error,
    user,
  })
}

export { HeaderWithAuth }
