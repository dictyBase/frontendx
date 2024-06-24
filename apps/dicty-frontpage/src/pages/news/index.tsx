import { match, P } from "ts-pattern"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import {
  useListContentByNamespaceQuery,
  ListContentByNamespaceQuery,
} from "dicty-graphql-schema"

type NewsViewProperties = {
  contentList: ListContentByNamespaceQuery["listContentByNamespace"]
}

const NewsView = ({ contentList }: NewsViewProperties) => <></>

const News = () => {
  const fetchState = useListContentByNamespaceQuery({
    variables: { namespace: "news" },
  })

  return match(fetchState)
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) => <>{error}</>)
    .with(
      {
        data: {
          listContentByNamespace: P.select(P.array({ content: P.string })),
        },
      },
      (contentList) => <NewsView contentList={contentList} />,
    )
    .otherwise(() => <> This message should not appear. </>)
}

export { News }
