import { useEffect, useRef } from "react"
import {
  Container,
  Box,
  Typography,
  Grid,
  Divider,
  makeStyles,
} from "@material-ui/core"
import { pipe, flow } from "fp-ts/function"
import { map as Amap, sort as Asort, filter as Afilter, isNonEmpty } from "fp-ts/Array"
import { fst, snd, mapFst, mapSnd } from "fp-ts/Tuple"
import { Ord, contramap } from "fp-ts/Ord"
import { toEntries as RtoEntries } from "fp-ts/Record"
import { match, P } from "ts-pattern"
import { ACCESS } from "@dictybase/auth"
import {
  FullPageLoadingDisplay,
  LabeledDivider,
  groupByDate,
} from "@dictybase/ui-common"
import { NewsItem } from "@dictybase/ui-frontpage"
import {
  useListContentByNamespaceQuery,
  ListContentByNamespaceQuery,
  Content,
} from "dicty-graphql-schema"
import { parseContentToText } from "@dictybase/editor"
import { parseISO } from "date-fns/fp"
import { NEWS_NAMESPACE } from "../../common/constants/namespace"
import { ordByDate } from "../../common/utils/ordByDate"
import { EmptyNewsView } from "../../common/components/EmptyNewsView"
import Worker from "../../worker?worker"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    textAlign: "left",
    padding: "0px 6rem 1rem 6rem",
    borderRadius: "15px",
    boxSizing: "border-box",
    "@media (max-width: 768px)": {
      padding: "0 0 0 0",
    },
  },
  headerContainer: {
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    color: "#ffffff",
  },
  heading: {
    marginBottom: theme.spacing(1),
  },
  subheading: {
    fontStyle: "italic",
  },
}))

type NewsViewProperties = {
  contentList: ListContentByNamespaceQuery["listContentByNamespace"]
}

const OrdByNewest: Ord<
  ListContentByNamespaceQuery["listContentByNamespace"][0]
> = pipe(
  ordByDate,
  contramap((content) => pipe(content.created_at, parseISO)),
)

const NewsView = ({ contentList }: NewsViewProperties) => {
  const { container, headerContainer, heading, subheading } = useStyles()
  const worker = useRef<null | Worker>(null)

  // We use the `useEffect` hook to setup the worker as soon as the `App` component is mounted.
  useEffect(() => {
    // Create the worker if it does not yet exist.
    console.log(import.meta.url)
    worker.current ??= new Worker()

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e) => {
      // TODO: Will fill in later
    }

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived)

    // Define a cleanup function for when the component is unmounted.
    return () =>
      worker.current.removeEventListener("message", onMessageReceived)
  })
  console.log(groupByDate(contentList))
  // ListContentByNamespaceQuery["listContentByNamespace"]
  const renderNewsItem = flow(
    (item: ListContentByNamespaceQuery["listContentByNamespace"][0]) => ({
      ...item,
      content: parseContentToText(item.content),
    }),
    ({ id, name, content, created_at }) => (
      <NewsItem key={id} name={name} createdAt={created_at} content={content} />
    ),
    (item) => <Grid item>{item}</Grid>,
  )

  const processGroupedContentList = flow(
    Asort(OrdByNewest),
    Amap(renderNewsItem),
  )

  return pipe(
    contentList, //separate into groups
    groupByDate,
    Afilter(flow(snd, isNonEmpty)),
    Amap(mapSnd(processGroupedContentList)),
    Amap((entry) => (
      <>
        <LabeledDivider label={fst(entry)} />
        <Grid container direction="column" spacing={3}>
          {snd(entry)}
        </Grid>
      </>
    )),
    // do these to each group
    // wrap in final container
    (groups) => (
      <Container className={container}>
        <Box className={headerContainer}>
          <Typography variant="h1" align="center" className={heading}>
            Dicty Community Resource News
          </Typography>
          <Typography align="center" className={subheading}>
            Latest updates from the Dictyostelium research community
          </Typography>
        </Box>
        {groups}
      </Container>
    ),
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
