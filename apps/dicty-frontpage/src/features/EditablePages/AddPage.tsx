import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { type UserInfoResponse, useLogto } from "@logto/react"
import { gql, useQuery } from "@apollo/client"
import { match, P } from "ts-pattern"
import { NAMESPACE } from "../../common/constants/namespace"
import { Loader } from "../../common/components/Loader"
import { GraphQLErrorPage } from "../../common/components/errors/GraphQLErrorPage"
import { useSlug } from "../../common/hooks/useSlug"
import { hasNotFoundError } from "../../common/utils/hasNotFoundError"
import { AddPageView } from "./AddPageView"

const QUERY = gql`
  query contentBySlug($slug: String!) {
    contentBySlug(slug: $slug) {
      id
      content
      name
      slug
      updated_at
      __typename
    }
  }
`

const AddPage = () => {
  const slug = useSlug()
  const result = useQuery(QUERY, {
    variables: { slug: `${NAMESPACE}-${slug}` },
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

  return match({ ...result, token, user })
    .with({ loading: true }, () => <Loader />)
    .with({ data: { contentBySlug: P.select({ content: P.string }) } }, () => (
      <Navigate to="../editable" replace relative="path" />
    ))
    .when(
      ({ error }) => hasNotFoundError(error) && token && user?.sub,
      () => (
        <AddPageView token={token as string} userId={user?.sub as string} />
      ),
    )
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <GraphQLErrorPage error={error} />
    ))
    .otherwise(() => <> This message should not appear </>)
}

export { AddPage }
