import { Container, Box, Typography, Grid, makeStyles } from "@material-ui/core"
import { teal } from "@material-ui/core/colors"
import { pipe } from "fp-ts/function"
import { map as Amap, sort as Asort } from "fp-ts/Array"
import { Ord, contramap } from "fp-ts/Ord"
import { match, P } from "ts-pattern"
import { ACCESS } from "@dictybase/auth"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
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
    fontStyle: "italic" 
  },
}))

type NewsViewProperties = {
  contentList: ListContentByNamespaceQuery["listContentByNamespace"]
}

const OrdByNewest: Ord<Pick<Content, "created_at">> = pipe(
  ordByDate,
  contramap((content) => pipe(content.created_at, parseISO)),
)

const NewsView = ({ contentList }: NewsViewProperties) => {
  const { container, headerContainer, heading, subheading } = useStyles()
  return pipe(
    contentList,
    Asort(OrdByNewest),
    Amap((item) => ({ ...item, content: parseContentToText(item.content) })),
    Amap(({ id, name, content, created_at }) => (
      <NewsItem key={id} name={name} createdAt={created_at} content={content} />
    )),
    Amap((item) => <Grid item>{item}</Grid>),
    (items) => (
      <Container className={container}>
        <Box className={headerContainer}>
          <Typography variant="h1" align="center" className={heading}>
            Dicty Community Resource News
          </Typography>
          <Typography align="center" className={subheading}>
            Latest updates from the Dictyostelium research community
          </Typography>
        </Box>
        <Grid container direction="column" spacing={3}>
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
