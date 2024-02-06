import { useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { ContentView } from "./ContentView"
import { NAMESPACE } from "../../common/constants/namespace"
import { useSlug } from "../../common/hooks/useSlug"
import { GraphQLErrorPage } from "../../common/components/errors/GraphQLErrorPage"
import { Loader } from "../../common/components/Loader"

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

const Show = () => {
  const slug = useSlug()
  // const { loading, error, data } = useContentBySlugQuery({
  //   variables: { slug },
  // })
  const { loading, error, data } = useQuery(QUERY, {
    variables: { slug: `${NAMESPACE}-${slug}` },
  })
  return match({ loading, error, data })
    .with({ loading: true }, () => <Loader />)
    .with({ error: P.select(P.not(undefined)) }, (error_) => (
      <GraphQLErrorPage error={error_} />
    ))
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (content) => <ContentView data={content} />,
    )
    .otherwise(() => <> This message should not appear. </>)
}

export { Show }
