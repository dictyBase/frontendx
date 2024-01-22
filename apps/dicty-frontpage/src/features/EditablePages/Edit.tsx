import { Navigate } from "react-router-dom"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { match, P } from "ts-pattern"
import { GraphQLErrorPage } from "../../common/components/errors/GraphQLErrorPage"
import { EditView } from "./EditView"
import { Loader } from "../../common/components/Loader"
import { useSlug } from "../../common/hooks/useSlug"
import { hasNotFoundError } from "../../common/utils/hasNotFoundError"

const Edit = () => {
  const slug = useSlug()
  const { loading, error, data } = useContentBySlugQuery({
    variables: { slug },
  })

  return match({ loading, error, data })
    .with({ loading: true }, () => <Loader />)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (content) => <EditView data={content} />,
    )
    .when(
      ({ error: error_ }) => pipe(error_, hasNotFoundError),
      () => <Navigate to="addpage" replace />,
    )
    .with({ error: P.select(P.not(undefined)) }, (error_) => (
      <GraphQLErrorPage error={error_} />
    ))
    .otherwise(() => <> This message should not appear </>)
}

export { Edit }
