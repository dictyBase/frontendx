import { Navigate } from "react-router-dom"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import {
  contentPageErrorMatcher,
  FullPageLoadingDisplay,
} from "@dictybase/ui-common"
import { EditableView } from "./EditableView"
import { NAMESPACE } from "../../common/constants/namespace"
import { useSlug } from "../../common/hooks/useSlug"

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
      (contentBySlug) => <EditableView data={contentBySlug} />,
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
