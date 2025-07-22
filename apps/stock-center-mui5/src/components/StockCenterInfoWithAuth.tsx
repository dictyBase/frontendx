import { match } from "ts-pattern"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { StockCenterInfo, AuthorizedStockCenterInfo } from "@dictybase/ui-dsc"
import { useAuthorization } from "@dictybase/auth-mui5"
import { NAMESPACE } from "../namespace"

const authorizedRoles = ["content-admin"]

const StockCenterInfoWithAuth = () => {
  const { isAuthorized } = useAuthorization({ entries: authorizedRoles })
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-intro` },
  })
  return match(isAuthorized)
    .with(true, () => <AuthorizedStockCenterInfo queryResult={result} />)
    .with(false, () => <StockCenterInfo queryResult={result} />)
    .exhaustive()
}

export { StockCenterInfoWithAuth }
