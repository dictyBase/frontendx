import { match, P } from "ts-pattern"
import { ContentBySlugQueryHookResult } from "dicty-graphql-schema"
import { LoadingDisplay, OtherError } from "@dictybase/ui-common"
import { AuthorizedStockCenterInfoDisplay } from "./AuthorizedStockCenterInfoDisplay"

type AuthorizedStockCenterInfoProperties = {
  queryResult: ContentBySlugQueryHookResult
}

const AuthorizedStockCenterInfo = ({
  queryResult,
}: AuthorizedStockCenterInfoProperties) =>
  match(queryResult)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      ({ content, slug }) => (
        <AuthorizedStockCenterInfoDisplay content={content} slug={slug} />
      ),
    )
    .with({ loading: true }, () => <LoadingDisplay rows={4} />)
    .with({ error: P.not(undefined) }, () => <OtherError />)
    .otherwise(() => <> This message should not appear. </>)

export { AuthorizedStockCenterInfo }
