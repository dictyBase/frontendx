import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { type UserInfoResponse, useLogto } from "@logto/react"
import { match, P } from "ts-pattern"
import {
  AddPageView,
  FullPageLoadingDisplay,
  GraphQLErrorPage,
} from "@dictybase/ui-common"
import { NAMESPACE } from "../../common/constants/namespace"
import { useSlug } from "../../common/hooks/useSlug"
import { useContentPath } from "../../common/hooks/useContentPath"
import { hasNotFoundError } from "../../common/utils/hasNotFoundError"

const AddPage = () => {
  const slug = useSlug()
  const contentPath = useContentPath()
  const { loading, data, error } = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
    fetchPolicy: "network-only",
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
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ data: { contentBySlug: P.select({ content: P.string }) } }, () => (
      <Navigate to="../editable" replace relative="path" />
    ))
    .when(
      ({ error: apolloError }) => hasNotFoundError(apolloError),
      () => (
        <AddPageView
          token={token as string}
          userId={user?.email as string}
          namespace={NAMESPACE}
          slug={slug}
          contentPath={contentPath}
        />
      ),
    )
    .with({ error: P.select(P.not(undefined)) }, (apolloError) => (
      <GraphQLErrorPage error={apolloError} />
    ))
    .otherwise(() => <> This message should not appear </>)
}

export { AddPage }
