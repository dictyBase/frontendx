import { Navigate } from "react-router-dom"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { match } from "ts-pattern"
import { useAuthorization, ACCESS } from "@dictybase/auth"

const RoleRedirect = () => {
  const { isLoading, isAuthorized } = useAuthorization({
    entries: ["content-admin"],
  })
  return match({ isLoading, isAuthorized })
    .with({ isAuthorized: true, isLoading: true }, () => (
      <Navigate to="editable" replace />
    ))
    .with({ isAuthorized: true, isLoading: false }, () => (
      <Navigate to="editable" replace />
    ))
    .with({ isAuthorized: false, isLoading: false }, () => (
      <Navigate to="show" replace />
    ))
    .with({ isAuthorized: false, isLoading: true }, () => (
      <FullPageLoadingDisplay />
    ))
    .exhaustive()
}

// eslint-disable-next-line import/no-default-export
export default RoleRedirect
export const access = ACCESS.public
