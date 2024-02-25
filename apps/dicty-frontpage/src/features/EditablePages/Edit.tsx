import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { type UserInfoResponse, useLogto } from "@logto/react"
import { EditView, FullPageLoadingDisplay } from "@dictybase/ui-common"
import { match, P } from "ts-pattern"
import { NAMESPACE } from "../../common/constants/namespace"
import { useSlug } from "../../common/hooks/useSlug"
import { contentPageErrorMatcher } from "../../common/utils/contentPageErrorMatcher"

const Edit = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
  })
  const { fetchUserInfo, getAccessToken, isAuthenticated } = useLogto()
  const [token, setToken] = useState<string>()
  const [user, setUser] = useState<UserInfoResponse>()
  useEffect(() => {
    const getUserData = async () => {
      if (!isAuthenticated) return
      setToken(
        await getAccessToken(
          import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE,
        ),
      )
      setUser(await fetchUserInfo())
    }

    getUserData()
  }, [fetchUserInfo, getAccessToken, isAuthenticated])

  return match({
    token,
    user,
    ...result,
  })
    .with(
      {
        data: { contentBySlug: P.select("content", { content: P.string }) },
        user: { email: P.select("userId", P.string) },
        token: P.select("authToken", P.string),
      },
      ({ content, userId, authToken }) => (
        <EditView data={content} userId={userId} token={authToken} />
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
