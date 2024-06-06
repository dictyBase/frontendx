import { Outlet } from "react-router-dom"
import { match } from "ts-pattern"
import { useLogto } from "@logto/react"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { UnAuthorized } from "./UnAuthorized"

type ConditionalRouteProperties = {
  isLoading: boolean
  isAuthenticated: boolean
}

/**
 * This file contains the implementation of the `conditionalRouting` function.
 * This function takes in a single parameter `props` of type `ConditionalRouteProperteies`.
 * It uses the `match` function to perform pattern matching on the `props` object.
 *
 * The `match` function is a utility function that allows for conditional routing based on the properties of the `props` object.
 * It takes in the `props` object and uses a series of `.when` methods to define different cases based on the properties of the `props` object.
 *
 * The first `.when` case checks if the `isLoading` property of the `props` object is truthy. If it is, it renders a `FullPageLoadingDisplay` component with `rows` prop set to 6.
 *
 * The second `.when` case checks if the `checkAuthorization` property of the `props` object is truthy. If it is, it renders an `Outlet` component.
 *
 * The `.otherwise` method is called when none of the previous cases match. In this case, it renders a `Navigate` component with a `to` prop set to "/".
 */
const conditionalRouting = (property: ConditionalRouteProperties) =>
  match(property)
    .when(
      ({ isAuthenticated }) => isAuthenticated,
      () => <Outlet />,
    )
    .when(
      ({ isLoading }) => isLoading,
      () => <FullPageLoadingDisplay />,
    )
    .otherwise(() => <UnAuthorized />)

const Protected = () => {
  const { isLoading, isAuthenticated } = useLogto()
  return conditionalRouting({ isLoading, isAuthenticated })
}

export { Protected }
