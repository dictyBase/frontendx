import { Navigate } from "react-router-dom"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import {
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
} from "@dictybase/ui-common"
import { AddPageView } from "./AddPageView"
import { NAMESPACE } from "../../common/constants/namespace"
import { useSlug } from "../../common/hooks/useSlug"
import { useContentPath } from "../../common/hooks/useContentPath"

const AddPage = () => {
  const slug = useSlug()
  const contentPath = useContentPath()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
    fetchPolicy: "network-only",
  })
  return match({
    ...result,
  })
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ data: { contentBySlug: P.select({ content: P.string }) } }, () => (
      <Navigate to="../editable" replace relative="path" />
    ))
    .with({ error: P.select(P.not(undefined)) }, (error) =>
      contentPageErrorMatcher(error, () => (
        <AddPageView
          namespace={NAMESPACE}
          name={slug}
          contentPath={contentPath}
        />
      )),
    )
    .otherwise(() => <> This message should not appear </>)
}

export { AddPage }
