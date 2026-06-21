import { FunctionComponent } from "react"
import { match } from "ts-pattern"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { UnAuthorized } from "./UnAuthorized"
import { useAuthorization } from "./useAuthorization"

type PrivateProperties = { roles: Array<string> }

/**
 * The `LazyPrivate` component is a functional component that renders a private route based on user roles.
 * It takes an object `roles` as a prop, which is of type `PrivateProperties`.
 *
 * @example
 * // Single role
 * <Private roles={['admin']}>
 *   <AdminDashboard />
 * </Private>
 *
 * // Multiple roles
 * <Private roles={['admin', 'manager']}>
 *   <AdminDashboard />
 * </Private>
 *
 * // Usage
 * const roles: PrivateProperties = { roles: ['admin', 'manager'] };
 * <Private roles={roles}>
 *   <AdminDashboard />
 * </Private>
 */
const LazyPrivate: FunctionComponent<PrivateProperties> = ({
  roles,
  children,
}) => {
  const { isLoading, isAuthorized } = useAuthorization({ entries: roles })
  return match({ isLoading, isAuthorized })
    .with({ isAuthorized: true }, () => <>{children}</>)
    .with({ isLoading: true }, () => <FullPageLoadingDisplay />)
    .otherwise(() => <UnAuthorized />)
}

export { LazyPrivate }
