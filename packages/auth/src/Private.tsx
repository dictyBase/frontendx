import { Outlet } from "react-router-dom"
import { match } from "ts-pattern"
import { LoadingDisplay } from "@dictybase/ui-dsc"
import { UnAuthorized } from "./UnAuthorized"
import { useAuthorization } from "./useAuthorization"

type ConditionalRouteProperties = {
  isLoading: boolean
  isAuthorized: boolean
}

type PrivateProperties = { roles: Array<string> }

/**
 * This file contains the implementation of the `conditionalRouting` function.
 * This function takes in a single parameter `props` of type `ConditionalRouteProperteies`.
 * It uses the `match` function to perform pattern matching on the `props` object.
 *
 * The `match` function is a utility function that allows for conditional routing based on the properties of the `props` object.
 * It takes in the `props` object and uses a series of `.when` methods to define different cases based on the properties of the `props` object.
 *
 * The first `.when` case checks if the `isLoading` property of the `props` object is truthy. If it is, it renders a `LoadingDisplay` component with `rows` prop set to 6.
 *
 * The second `.when` case checks if the `checkAuthorization` property of the `props` object is truthy. If it is, it renders an `Outlet` component.
 *
 * The `.otherwise` method is called when none of the previous cases match. In this case, it renders a `Navigate` component with a `to` prop set to "/".
 */
const conditionalRouting = (property: ConditionalRouteProperties) =>
  match(property)
    .when(
      ({ isLoading }) => isLoading,
      () => <LoadingDisplay rows={6} />,
    )
    .when(
      ({ isAuthorized }) => isAuthorized,
      () => <Outlet />,
    )
    .otherwise(() => <UnAuthorized />)

/**
 * The `Private` component is a functional component that renders a private route based on user roles.
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
const Private = ({ roles }: PrivateProperties) => {
  const { isLoading, isAuthorized } = useAuthorization({ entries: roles })
  return conditionalRouting({ isLoading, isAuthorized })
}

export { Private }
