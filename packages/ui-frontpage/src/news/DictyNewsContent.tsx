import { match, P } from "ts-pattern"
import { pipe } from "fp-ts/function"
import {
  takeLeft as AtakeLeft,
  sort as Asort,
  reverse as Areverse,
} from "fp-ts/Array"
import {
  ListContentByNamespaceQueryHookResult,
  ListContentByNamespaceQuery,
} from "dicty-graphql-schema"
import { NewsList } from "./NewsList"
import { EmptyNewsList } from "./EmptyNewsList"
import { NewsLoader } from "./NewsLoader"
import { ordByUpdatedAt } from "../utils/ordByUpdatedAt"

type DictyNewsContentProperties = {
  queryResult: ListContentByNamespaceQueryHookResult
}

const renderNewsList = (
  newsList: ListContentByNamespaceQuery["listContentByNamespace"],
) =>
  pipe(newsList, Asort(ordByUpdatedAt), Areverse, AtakeLeft(3), (list) => (
    <NewsList contentList={list} />
  ))

const DictyNewsContent = ({
  queryResult,
}: DictyNewsContentProperties) =>
  match(queryResult)
    .with(
      {
        data: {
          listContentByNamespace: [],
        },
      },
      () => <EmptyNewsList />,
    )
    .with(
      {
        data: {
          listContentByNamespace: P.select(P.array({ content: P.string })),
        },
      },
      renderNewsList,
    )
    .with({ loading: true }, () => <NewsLoader />)
    .with({ error: P.select(P.not(undefined)) }, () => <EmptyNewsList />)
    .otherwise(() => <> This message should not appear. </>)

export { DictyNewsContent }
