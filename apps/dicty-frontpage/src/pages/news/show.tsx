import {
  Box,
  Grid,
} from "@material-ui/core"
import { pipe, flow } from "fp-ts/function"
import {
  map as Amap,
  sort as Asort,
  filter as Afilter,
  isNonEmpty,
} from "fp-ts/Array"
import { fst, snd, mapSnd } from "fp-ts/Tuple"
import { Ord, contramap } from "fp-ts/Ord"
import { match, P } from "ts-pattern"
import { ACCESS } from "@dictybase/auth"
import {
  FullPageLoadingDisplay,
  LabeledDivider,
  groupByDate,
} from "@dictybase/ui-common"
import { NewsListWrapper, NewsItem } from "@dictybase/ui-frontpage"
import {
  useListContentByNamespaceQuery,
  ListContentByNamespaceQuery,
} from "dicty-graphql-schema"
import { parseContentToText } from "@dictybase/editor"
import { parseISO } from "date-fns/fp"
import { NEWS_NAMESPACE } from "../../common/constants/namespace"
import { ordByDate } from "../../common/utils/ordByDate"
import { EmptyNewsView } from "../../common/components/EmptyNewsView"

type NewsList = ListContentByNamespaceQuery["listContentByNamespace"]

type NewsViewProperties = {
  contentList: NewsList
}

const OrdByNewest: Ord<
  ListContentByNamespaceQuery["listContentByNamespace"][0]
> = pipe(
  ordByDate,
  contramap((content) => pipe(content.created_at, parseISO)),
)

const renderNewsItem = flow(
  (item: ListContentByNamespaceQuery["listContentByNamespace"][0]) => ({
    ...item,
    content: parseContentToText(item.content),
  }),
  ({ id, name, content, created_at }) => (
    <Grid item key={id}>
      <NewsItem name={name} createdAt={created_at} content={content} />
    </Grid>
  ),
)

const processGroupedContentList = flow(Asort(OrdByNewest), Amap(renderNewsItem))

const NewsView = ({ contentList }: NewsViewProperties) => {

  return pipe(
    contentList,
    // groupByDate turns Array<NewsList> -> Array<[string, NewsList]>,
    // where the string is the label of a date grouping, such as "Last Month".
    groupByDate,
    // If any date groups have empty lists, remove them.
    Afilter(flow(snd, isNonEmpty)),
    // Map each group's corresponding news list into a news item UI element.
    Amap(mapSnd(processGroupedContentList)),
    // Render each date group with a label.
    Amap((entry) => (
      <Box key={fst(entry)}>
        <LabeledDivider label={fst(entry)} />
        <Grid container direction="column" spacing={3}>
          {snd(entry)}
        </Grid>
      </Box>
    )),
    // Wrap in a news list container.
    (groups) => <NewsListWrapper>{groups}</NewsListWrapper>,
  )
}

const News = () => {
  const fetchState = useListContentByNamespaceQuery({
    variables: { namespace: NEWS_NAMESPACE },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  })
  return match(fetchState)
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, () => <EmptyNewsView />)
    .with(
      {
        data: {
          listContentByNamespace: [],
        },
      },
      () => <EmptyNewsView />,
    )
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

export { NewsView }
// eslint-disable-next-line import/no-default-export
export default News
export const access = ACCESS.public
