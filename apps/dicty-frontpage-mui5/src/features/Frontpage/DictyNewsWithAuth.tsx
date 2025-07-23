import { DictyNews, AuthorizedDictyNews } from "@dictybase/ui-frontpage"
import { useListContentByNamespaceQuery } from "dicty-graphql-schema"
import { useAuthorization } from "@dictybase/auth-mui5"
import { match } from "ts-pattern"

const authorizedRoles = ["content-admin"]

const DictyNewsWithAuth = () => {
  const { isAuthorized } = useAuthorization({ entries: authorizedRoles })
  const queryResult = useListContentByNamespaceQuery({
    variables: { namespace: "news" },
    fetchPolicy: "cache-and-network",
  })
  return match(isAuthorized)
    .with(true, () => <AuthorizedDictyNews queryResult={queryResult} />)
    .with(false, () => <DictyNews queryResult={queryResult} />)
    .exhaustive()
}

export { DictyNewsWithAuth }
