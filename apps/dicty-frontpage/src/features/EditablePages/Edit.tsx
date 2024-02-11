import { Navigate } from "react-router-dom"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { EditView } from "@dictybase/ui-common"
import { match, P } from "ts-pattern"
import { NAMESPACE } from "../../common/constants/namespace"
import { GraphQLErrorPage } from "../../common/components/errors/GraphQLErrorPage"
import { Loader } from "../../common/components/Loader"
import { useSlug } from "../../common/hooks/useSlug"
import { hasNotFoundError } from "../../common/utils/hasNotFoundError"

const Edit = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
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
