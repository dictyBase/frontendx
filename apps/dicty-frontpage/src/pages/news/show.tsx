import { Container, Box, Typography, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { map as Amap, sort as Asort } from "fp-ts/Array"
import { Ord, contramap } from "fp-ts/Ord"
import { match, P } from "ts-pattern"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { Editor } from "@dictybase/editor"
import {
  useListContentByNamespaceQuery,
  ListContentByNamespaceQuery,
  Content,
} from "dicty-graphql-schema"
import { parseISO, format } from "date-fns/fp"
import { NEWS_NAMESPACE } from "../../common/constants/namespace"
import { ordByDate } from "../../common/utils/ordByDate"

const useStyles = makeStyles({
  container: {
    textAlign: "left",
    padding: "0px 6rem 1rem 6rem",
    borderRadius: "15px",
    boxSizing: "border-box",
    marginBottom: "10px",
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

const NewsItem = ({ name, content, updated_at }: NewsItemProperties) => (
  <Box>
    <Typography variant="h2">
      {pipe(updated_at, parseISO, format("PPPP"))}
    </Typography>
    <Editor
      content={{ storageKey: "test", editorState: content }}
      editable={false}
    />
    <Link to={`../news/${name}/show`}> Read more </Link>
  </Box>
)

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
      <NewsItem
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
            News
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
          listContentByNamespace: P.select(P.array({ content: P.string })),
        },
      },
      (contentList) => <NewsView contentList={contentList} />,
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <>{error.message}</>
    ))
    .otherwise(() => <> This message should not appear. </>)
}

// eslint-disable-next-line import/no-default-export
export default News