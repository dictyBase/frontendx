import { Container, Box, Typography, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { map as Amap, sort as Asort } from "fp-ts/Array"
import { Ord, contramap } from "fp-ts/Ord"
import { match, P } from "ts-pattern"
import { ACCESS } from "@dictybase/auth"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import {
  useListContentByNamespaceQuery,
  ListContentByNamespaceQuery,
  Content,
} from "dicty-graphql-schema"
import { parseContentToText } from "@dictybase/editor"
import { parseISO, format } from "date-fns/fp"
import { NEWS_NAMESPACE } from "../../common/constants/namespace"
import { ordByDate } from "../../common/utils/ordByDate"
import { truncateString } from "../../common/utils/truncateString"
import { EmptyNewsView } from "../../common/components/EmptyNewsView"

const useStyles = makeStyles({
  container: {
    textAlign: "left",
    padding: "0px 6rem 1rem 6rem",
    borderRadius: "15px",
    boxSizing: "border-box",
    "@media (max-width: 768px)": {
      padding: "0 0 0 0",
    },
  },
  header: {
    color: "black",
    fontSize: "20px",
    padding: "15px 35px 15px 35px",
    marginBottom: "10px",
    "@media (max-width: 767px)": {
      fontSize: "24px",
      textAlign: "right",
      padding: "20px 5px 20px 15px",
    },
  },
})

type NewsItemProperties = {
  name: string
  content: string
  createdAt: string
}

const NewsItem = ({ name, content, createdAt }: NewsItemProperties) => (
  <Link to={`../news/${name}/show`}>
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography variant="h2">
          {pipe(createdAt, parseISO, format("PPPP"))}
        </Typography>
      </Grid>
      <Grid item>
        <Typography color="textPrimary">
          {truncateString(parseContentToText(content), 400)}
        </Typography>
      </Grid>
    </Grid>
  </Link>
)

type NewsViewProperties = {
  contentList: ListContentByNamespaceQuery["listContentByNamespace"]
}

const OrdByNewest: Ord<Pick<Content, "created_at">> = pipe(
  ordByDate,
  contramap((content) => pipe(content.created_at, parseISO)),
)

const NewsView = ({ contentList }: NewsViewProperties) => {
  const { container, header } = useStyles()
  return pipe(
    contentList,
    Asort(OrdByNewest),
    Amap(({ id, name, content, created_at }) => (
      <NewsItem key={id} name={name} createdAt={created_at} content={content} />
    )),
    Amap((item) => <Grid item>{item}</Grid>),
    (items) => (
      <Container className={container}>
        <Box className={header}>
          <Typography variant="h1" align="center">
            Dicty Community Resource News
          </Typography>
        </Box>
        <Grid container direction="column" spacing={7}>
          {items}
        </Grid>
      </Container>
    ),
  )
}

const News = () => {
  const fetchState = useListContentByNamespaceQuery({
    variables: { namespace: NEWS_NAMESPACE },
    fetchPolicy: "cache-and-network",
  })
  return match(fetchState)
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
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, () => <EmptyNewsView />)
    .otherwise(() => <> This message should not appear. </>)
}

export { NewsItem, NewsView }
// eslint-disable-next-line import/no-default-export
export default News
export const access = ACCESS.public
