import { Navigate } from "react-router-dom"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { EditableView, FullPageLoadingDisplay } from "@dictybase/ui-common"
import { NAMESPACE } from "../../common/constants/namespace"
import { useSlug } from "../../common/hooks/useSlug"
import { contentPageErrorMatcher } from "../../common/utils/contentPageErrorMatcher"

const Editable = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  })
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (content) => <EditableView data={content} />,
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) =>
      contentPageErrorMatcher(error, () => (
        <Navigate to="../notfoundauth" replace relative="path" />
      )),
    )
    .otherwise(() => <> This message should not appear </>)
}

export { Editable }
