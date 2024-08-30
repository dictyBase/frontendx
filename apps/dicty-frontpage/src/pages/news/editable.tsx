import { Container, Box, Typography, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { map as Amap, sort as Asort } from "fp-ts/Array"
import { Ord, contramap } from "fp-ts/Ord"
import { match, P } from "ts-pattern"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import {
  useListContentByNamespaceQuery,
  ListContentByNamespaceQuery,
  Content,
} from "dicty-graphql-schema"
import { parseISO, format } from "date-fns/fp"
import { ACCESS } from "@dictybase/auth"
import { parseContentToText } from "@dictybase/editor"
import { NEWS_NAMESPACE } from "../../common/constants/namespace"
import { NewsListActionBar } from "../../common/components/NewsListActionBar"
import { EmptyNewsViewAuth } from "../../common/components/EmptyNewsViewAuth"
import { truncateString } from "../../common/utils/truncateString"
import { ordByDate } from "../../common/utils/ordByDate"

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
  updated_at: string
}

const EditableNewsItem = ({
  name,
  content,
  updated_at,
}: NewsItemProperties) => {
  return (
    <Link to={`../news/${name}/editable`}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h2">
            {pipe(updated_at, parseISO, format("PPPP"))}
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
}

type NewsViewProperties = {
  contentList: ListContentByNamespaceQuery["listContentByNamespace"]
}

const OrdByNewest: Ord<Pick<Content, "updated_at">> = pipe(
  ordByDate,
  contramap((content) => pipe(content.updated_at, parseISO)),
)

const NewsView = ({ contentList }: NewsViewProperties) => {
  const { container, header } = useStyles()
  return pipe(
    contentList,
    Asort(OrdByNewest),
    Amap(({ id, name, content, updated_at }) => (
      <EditableNewsItem
        key={id}
        name={name}
        updated_at={updated_at}
        content={content}
      />
    )),
    Amap((item) => <Grid item>{item}</Grid>),
    (items) => (
      <Container className={container}>
        <Box className={header}>
          <Typography variant="h1" align="center">
            Dicty Community Resource News
          </Typography>
        </Box>
        <Grid container direction="row">
          <Grid item xl={1} lg={1}>
            <NewsListActionBar />
          </Grid>
          <Grid item xl={11} lg={11}>
            <Grid container direction="column" spacing={7}>
              {items}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    ),
  )
}

const EditableNews = () => {
  const fetchState = useListContentByNamespaceQuery({
    variables: { namespace: NEWS_NAMESPACE },
    fetchPolicy: "cache-and-network",
  })
  return match(fetchState)
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with(
      {
        data: {
          listContentByNamespace: [],
        },
      },
      () => <EmptyNewsViewAuth />,
    )
    .with(
      {
        data: {
          listContentByNamespace: P.select(P.array({ content: P.string })),
        },
      },
      (contentList) => <NewsView contentList={contentList} />,
    )
    .with({ error: P.select(P.not(undefined)) }, () => <EmptyNewsViewAuth />)
    .otherwise(() => <> This message should not appear. </>)
}

// eslint-disable-next-line import/no-default-export
export default EditableNews
export const roles = ["content-admin"]
export const access = ACCESS.private
