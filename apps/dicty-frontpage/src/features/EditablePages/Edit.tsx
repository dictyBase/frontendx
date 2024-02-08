import { Navigate } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { NAMESPACE } from "../../common/constants/namespace"
import { GraphQLErrorPage } from "../../common/components/errors/GraphQLErrorPage"
import { EditView } from "./EditView"
import { Loader } from "../../common/components/Loader"
import { useSlug } from "../../common/hooks/useSlug"
import { hasNotFoundError } from "../../common/utils/hasNotFoundError"

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

const Edit = () => {
  const slug = useSlug()
  // const result = useContentBySlugQuery({
  //   variables: { slug },
  // })
  const result = useQuery(QUERY, {
    variables: { slug: `${NAMESPACE}-${slug}` },
  })

  return match(result)
    .with({ loading: true }, () => <Loader />)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (content) => <EditView data={content} />,
    )
    .when(
      ({ error }) => hasNotFoundError(error),
      () => <Navigate to="../notFoundAuth" replace relative="path" />,
    )
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <GraphQLErrorPage error={error} />
    ))
    .otherwise(() => <> This message should not appear </>)
}

export { Edit }
