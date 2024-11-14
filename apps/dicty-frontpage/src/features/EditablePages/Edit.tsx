import { useContentBySlugQuery } from "dicty-graphql-schema"
import { FullPageLoadingDisplay, GraphQLErrorPage } from "@dictybase/ui-common"
import { match, P } from "ts-pattern"
import { EditView } from "./EditView"
import { NAMESPACE } from "../../common/constants/namespace"
import { useSlug } from "../../common/hooks/useSlug"

const Edit = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-${slug}` },
    errorPolicy: "all",
  })
  return match(result)
    .with(
      {
        data: { contentBySlug: P.select({ content: P.string }) },
      },
      (content) => <EditView data={content} />,
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <GraphQLErrorPage error={error} />
    ))
    .otherwise(() => <> This message should not appear </>)
}

export { Edit }
