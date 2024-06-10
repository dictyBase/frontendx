import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { useLogto, UserInfoResponse } from "@logto/react"
import {
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
} from "@dictybase/ui-common"
import { EditView } from "@dictybase/editor"
import { match, P } from "ts-pattern"
import { NAMESPACE } from "../../common/constants/namespace"
import { useSlug } from "../../common/hooks/useSlug"

const Edit = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
  })
  const { fetchUserInfo, getAccessToken, isAuthenticated } = useLogto()
  const [user, setUser] = useState<UserInfoResponse>()
  useEffect(() => {
    const getUserData = async () => {
      if (!isAuthenticated) return
      setUser(await fetchUserInfo())
    }

    getUserData()
  }, [fetchUserInfo, getAccessToken, isAuthenticated])
  return match({
    getAccessToken,
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
          getAccessToken={getAccessToken}
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
