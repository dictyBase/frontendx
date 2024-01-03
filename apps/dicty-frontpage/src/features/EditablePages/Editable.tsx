import { useParams, Navigate } from "react-router-dom"
import { type GraphQLErrors, type ApolloError } from "@apollo/client/errors"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import {
  fromArray,
  filter as readonlyArrayFilter,
  isNonEmpty,
} from "fp-ts/lib/ReadonlyArray"
import { getOrElse, fromNullable } from "fp-ts/Option"
import { match, P } from "ts-pattern"
import { GraphQLErrorPage } from "../../common/components/errors/GraphQLErrorPage"
import { EditableView } from "./EditableView"
import { Loader } from "../../common/components/Loader"
import { getSlug } from "../../common/utils/getSlug"

const hasNotFoundError = (apolloError: ApolloError | undefined) =>
  pipe(
    apolloError,
    fromNullable,
    getOrElse(() => ({
      graphQLErrors: fromArray([]) as GraphQLErrors,
    })),
    ({ graphQLErrors }) => graphQLErrors,
    readonlyArrayFilter((gqlError) => gqlError.extensions?.code === "NotFound"),
    isNonEmpty,
  )

const Editable = () => {
  const { name, subname } = useParams()
  const slug = getSlug({ name, subname })
  const { loading, error, data } = useContentBySlugQuery({
    variables: { slug },
  })

  return match({ loading, error, data })
    .with({ loading: true }, () => <Loader />)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (content) => <EditableView data={content} />,
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

export { Editable }
