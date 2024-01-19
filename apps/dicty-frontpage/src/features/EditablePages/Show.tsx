import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { ContentView } from "./ContentView"
import { useSlug } from "../../common/utils/useSlug"
import { GraphQLErrorPage } from "../../common/components/errors/GraphQLErrorPage"
import { Loader } from "../../common/components/Loader"

const Show = () => {
  const slug = useSlug()
  const { loading, error, data } = useContentBySlugQuery({
    variables: { slug },
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
