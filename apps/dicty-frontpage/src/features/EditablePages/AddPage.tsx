import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { type UserInfoResponse, useLogto } from "@logto/react"
import { match, P } from "ts-pattern"
import { NAMESPACE } from "../../common/constants/namespace"
import { Loader } from "../../common/components/Loader"
import { GraphQLErrorPage } from "../../common/components/errors/GraphQLErrorPage"
import { useSlug } from "../../common/hooks/useSlug"
import { hasNotFoundError } from "../../common/utils/hasNotFoundError"
import { AddPageView } from "./AddPageView"

const AddPage = () => {
  const slug = useSlug()
  const {
    loading: gqlLoading,
    data,
    error,
  } = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
    fetchPolicy: "network-only",
  })
  const {
    fetchUserInfo,
    getAccessToken,
    isAuthenticated,
    isLoading: logToLoading,
  } = useLogto()
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
    loading: gqlLoading || logToLoading,
  })
    .with({ loading: true }, () => <Loader />)
    .with({ data: { contentBySlug: P.select({ content: P.string }) } }, () => (
      <Navigate to="../editable" replace relative="path" />
    ))
    .when(
      ({ error: apolloError }) =>
        hasNotFoundError(apolloError) && token && user?.sub,
      () => (
        <AddPageView token={token as string} userId={user?.sub as string} />
      ),
    )
    .with({ error: P.select(P.not(undefined)) }, (apolloError) => (
      <GraphQLErrorPage error={apolloError} />
    ))
    .otherwise(() => <> This message should not appear </>)
}

export { AddPage }
