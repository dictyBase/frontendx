import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { type UserInfoResponse, useLogto } from "@logto/react"
import { EditView, FullPageLoadingDisplay } from "@dictybase/ui-common"
import { match, P } from "ts-pattern"
import { NAMESPACE } from "../../common/constants/namespace"
import { GraphQLErrorPage } from "../../common/components/errors/GraphQLErrorPage"
import { useSlug } from "../../common/hooks/useSlug"
import { hasNotFoundError } from "../../common/utils/hasNotFoundError"

const Edit = () => {
  const slug = useSlug()
  const { loading, data, error } = useContentBySlugQuery({
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
    data,
    error,
    token,
    user,
    loading,
  })
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (content) => (
        <EditView
          data={content}
          userId={user?.email as string}
          token={token as string}
        />
      ),
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .when(
      ({ error: apolloError }) => hasNotFoundError(apolloError),
      () => <Navigate to="../notFoundAuth" replace relative="path" />,
    )
    .with({ error: P.select(P.not(undefined)) }, (apolloError) => (
      <GraphQLErrorPage error={apolloError} />
    ))
    .otherwise(() => <> This message should not appear </>)
}

export { Edit }
