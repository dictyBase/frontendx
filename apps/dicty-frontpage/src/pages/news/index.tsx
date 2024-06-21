import { match } from "ts-pattern"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { PublicationsView } from "./PublicationsView"
import { useListContentByNamespace } from "dicty-graphql-schema"

const News = () => {
  const fetchState = useListNewsContentByNamespace({ variables: { namspace: "news" })

  return match(fetchState)
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .when(
      ({ error }) => error.length > 0,
      ({ error }) => <>{error}</>,
    )
    .when(
      ({ data }) => data.length > 0,
      ({ data }) => <PublicationsView data={data} />,
    )
    .otherwise(() => <> This message should not appear. </>)
}

export { News }
