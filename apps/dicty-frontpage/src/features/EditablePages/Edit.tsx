import { Navigate } from "react-router-dom"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import {
  EditView,
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
} from "@dictybase/ui-common"
import { match, P } from "ts-pattern"
import { useTokenAndUser } from "auth"
import { NAMESPACE } from "../../common/constants/namespace"
import { useSlug } from "../../common/hooks/useSlug"

const Edit = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
  })
  const { token, user } = useTokenAndUser(
    import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE,
  )

  return match({
    token,
    user,
    ...result,
  })
    .with(
      {
        data: { contentBySlug: P.select({ content: P.string }) },
      },
      (content) => (
        <EditView
          data={content}
          userId={user?.email as string}
          token={token as string}
        />
      ),
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) =>
      contentPageErrorMatcher(error, () => (
        <Navigate to="../notfoundauth" replace relative="path" />
      )),
    )
    .otherwise(() => <> This message should not appear </>)
}

export { Edit }
