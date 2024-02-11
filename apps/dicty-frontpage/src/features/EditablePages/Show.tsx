import { Navigate } from "react-router-dom"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { ContentView } from "@dictybase/ui-common"
import { NAMESPACE } from "../../common/constants/namespace"
import { useSlug } from "../../common/hooks/useSlug"
import { hasNotFoundError } from "../../common/utils/hasNotFoundError"
import { GraphQLErrorPage } from "../../common/components/errors/GraphQLErrorPage"
import { Loader } from "../../common/components/Loader"

const Show = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
  })
  return match(result)
    .with({ loading: true }, () => <Loader />)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (content) => <ContentView data={content} />,
    )
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <GraphQLErrorPage error={error} />
    ))
    .when(
      ({ error }) => hasNotFoundError(error),
      () => <Navigate to="../notfound" replace relative="path" />,
    )
    .otherwise(() => <> This message should not appear. </>)
}

export { Show }
