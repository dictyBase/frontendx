import { DictyNews, AuthorizedDictyNews } from "@dictybase/ui-frontpage"
import { useAuthorization } from "@dictybase/auth"
import { match } from "ts-pattern"

const authorizedRoles = ["content-admin"]

const DictyNewsWithAuth = () => {
  const { isAuthorized } = useAuthorization({ entries: authorizedRoles })
  return match(isAuthorized)
    .with(true, () => <AuthorizedDictyNews />)
    .with(false, () => <DictyNews />)
    .exhaustive()
}

export { DictyNewsWithAuth }
