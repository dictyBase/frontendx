import { Navigate } from "react-router-dom"
import { match } from "ts-pattern"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { useAuthorization, ACCESS } from "@dictybase/auth-mui5"
import { StrainDetailsContainer } from "@dictybase/ui-dsc"

const AUTHORIZED_ROLES = ["content-admin"]

/**
 * StrainDetailsPage redirects authorized content-admin users to the editable
 * strain details view (`editable`), and renders the read-only `StrainDetailsContainer`
 * for unauthorized users.
 *
 * @returns Redirect to `editable`, loading display, or public strain details view.
 */
const StrainDetailsPage = () => {
  const { isLoading, isAuthorized } = useAuthorization({
    entries: AUTHORIZED_ROLES,
  })
  return match({ isLoading, isAuthorized })
    .with({ isAuthorized: true }, () => <Navigate to="editable" replace />)
    .with({ isAuthorized: false, isLoading: true }, () => (
      <FullPageLoadingDisplay />
    ))
    .with({ isAuthorized: false, isLoading: false }, () => (
      <StrainDetailsContainer />
    ))
    .exhaustive()
}

// eslint-disable-next-line import/no-default-export
export default StrainDetailsPage
export const access = ACCESS.public
