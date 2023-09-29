import { Header } from "@dictybase/header"
import { match, P } from "ts-pattern"
import { useLogto, UserInfoResponse } from "@logto/react"
import { useState, useEffect } from "react"
import { Router as RemixRouter } from "@remix-run/router"
import { LoginButton } from "./LoginButton"
import { LogoutButton } from "./LogoutButton"
import { callbackPath, homePath } from "./const"

type HeaderWithAuthProperties = {
  clientRouter: RemixRouter
}

type logtoHookProperties = HeaderWithAuthProperties & {
  error: Error | undefined
  isAuthenticated: boolean
  isLoading: boolean
  user: UserInfoResponse | undefined
}

const conditonalHandler = (logtoCase: logtoHookProperties) =>
  match(logtoCase)
    .with(
      P.when(({ isAuthenticated, user }) =>
        isAuthenticated && user ? isAuthenticated : false,
      ),
      ({ user, clientRouter }) => {
        const LoginOut = (
          <LogoutButton
            url={homePath}
            user={user as UserInfoResponse}
            clientRouter={clientRouter}
          />
        )
        return <Header LoginOut={LoginOut} />
      },
    )
    .otherwise(() => <Header LoginOut={<LoginButton url={callbackPath} />} />)

const HeaderWithAuth = ({ clientRouter }: HeaderWithAuthProperties) => {
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
    clientRouter,
  })
}

export { HeaderWithAuth }
