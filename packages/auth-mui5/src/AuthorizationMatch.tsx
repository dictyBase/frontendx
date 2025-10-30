import { FunctionComponent, ReactElement } from "react"
import { match } from "ts-pattern"
import { useAuthorization } from "./useAuthorization"
import { Roles } from "./const"

const AuthorizationMatch: FunctionComponent<{
  allowedRoles: Set<Roles>
  authorized: ReactElement
  unauthorized: ReactElement
  loading: ReactElement
}> = ({ allowedRoles, authorized, unauthorized, loading }) => {
  const authorizationResult = useAuthorization({
    entries: allowedRoles,
  })

  return match(authorizationResult)
    .with({ isLoading: true, isAuthorized: false }, () => loading)
    .with({ isAuthorized: true }, () => authorized)
    .with({ isAuthorized: false }, () => unauthorized)
    .otherwise(() => unauthorized)
}

export { AuthorizationMatch }
