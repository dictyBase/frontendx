import { match } from "ts-pattern"
import { type Comp } from "@dictybase/functional"

type ConditionalRouteProperties = {
  isAuthorized: boolean
  authorized: Comp
  unauthorized: Comp
}

const displayOnAuthorized = (property: ConditionalRouteProperties) =>
  match(property)
    .when(
      ({ isAuthorized }) => isAuthorized,
      ({ authorized }) => <>{authorized}</>,
    )
    .otherwise(({ unauthorized }) => <>{unauthorized}</>)

export { displayOnAuthorized }
