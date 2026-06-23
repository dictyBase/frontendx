import { match, P } from "ts-pattern"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import { LoadingDisplay, OtherError } from "@dictybase/ui-common"
import { StockCenterInfoDisplay } from "@dictybase/ui-dsc"
import { NAMESPACE } from "../../namespace"

const StockCenterInfo = () => {
  const queryResult = useContentBySlugQuery({
    variables: { slug: `${NAMESPACE}-intro` },
  })
  return match(queryResult)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      ({ content, slug }) => (
        <StockCenterInfoDisplay content={content} slug={slug} />
      ),
    )
    .with({ loading: true }, () => <LoadingDisplay rows={4} />)
    .with({ error: P.not(undefined) }, () => <OtherError />)
    .otherwise(() => <> This message should not appear.</>)
}

export { StockCenterInfo }
