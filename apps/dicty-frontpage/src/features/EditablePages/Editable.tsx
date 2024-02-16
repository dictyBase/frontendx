import { Navigate } from "react-router-dom"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { match, P } from "ts-pattern"
import {
  EditableView,
  EditableContentLoadingDisplay,
} from "@dictybase/ui-common"
import { NAMESPACE } from "../../common/constants/namespace"
import { GraphQLErrorPage } from "../../common/components/errors/GraphQLErrorPage"
import { useSlug } from "../../common/hooks/useSlug"
import { hasNotFoundError } from "../../common/utils/hasNotFoundError"

const Editable = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  })
  return match(result)
    .with({ loading: true }, () => <EditableContentLoadingDisplay />)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (content) => <EditableView data={content} />,
    )
    .when(
      ({ error }) => pipe(error, hasNotFoundError),
      () => <Navigate to="../notfoundauth" replace relative="path" />,
    )
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <GraphQLErrorPage error={error} />
    ))
    .otherwise(() => <> This message should not appear </>)
}

export { Editable }
