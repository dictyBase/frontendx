import { Navigate } from "react-router-dom"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import {
  FullPageLoadingDisplay,
  contentPageErrorMatcher,
} from "@dictybase/ui-common"
import { ShowView } from "./ShowView"
import { NAMESPACE } from "../../common/constants/namespace"
import { useSlug } from "../../common/hooks/useSlug"

const Show = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
  })
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      (content) => <ShowView data={content} />,
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) =>
      contentPageErrorMatcher(error, () => (
        <Navigate to="../notfound" replace relative="path" />
      )),
    )
    .otherwise(() => <> This message should not appear. </>)
}

export { Show }
