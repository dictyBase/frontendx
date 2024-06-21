import { match } from "ts-pattern"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { PublicationsView } from "./PublicationsView"
import { useListContentByNamespace, ListContentByNamespace } from "dicty-graphql-schema"

type NewsViewProperties = {
  data: 
}

const NewsView = () => <></>

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
      ({ data }) => <NewsView data={data} />,
    )
    .otherwise(() => <> This message should not appear. </>)
}

export { News }
