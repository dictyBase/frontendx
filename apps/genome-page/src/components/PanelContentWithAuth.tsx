import { FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { useAuthorization, Roles } from "@dictybase/auth-mui5"
import { AuthorizedPanelContent } from "./AuthorizedPanelContent"

const authorizedEntries = [Roles.CONTENT_ADMIN]

const PanelContentWithAuth: FunctionComponent<{ content: string }> = ({
  content,
}) => {
  const { isAuthorized } = useAuthorization({ entries: authorizedEntries })

  return pipe(
    isAuthorized,
    Bmatch(
      () => <>{content}</>,
      () => <AuthorizedPanelContent content={content} />,
    ),
  )
}

export { PanelContentWithAuth }
