import { DictyInfo, AuthorizedDictyInfo } from "@dictybase/ui-frontpage"
import { useAuthorization } from "@dictybase/auth"
import { match } from "ts-pattern"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { NAMESPACE } from "../../common/constants/namespace"

const authorizedRoles = ["content-admin"]

const DictyInfoWithAuth = () => {
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-info` },
  })
  const { isAuthorized } = useAuthorization({ entries: authorizedRoles })
  return match(isAuthorized)
    .with(true, () => <AuthorizedDictyInfo queryResult={result}/>)
    .with(false, () => <DictyInfo queryResult={result} />)
    .exhaustive()
}

export { DictyInfoWithAuth }
