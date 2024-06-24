import { Container, Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { match, P } from "ts-pattern"
import { FullPageLoadingDisplay } from "@dictybase/ui-common"
import { Editor } from "@dictybase/editor"
import {
  useListContentByNamespaceQuery,
  ListContentByNamespaceQuery,
} from "dicty-graphql-schema"
import { parseISO, format } from "date-fns/fp"

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
  id: string
  content: string
  updated_at: string
}

const NewsItem = ({ id, content, updated_at }: NewsItemProperties) => (
  <Box>
    <Link to={id}>
      <Typography>{pipe(updated_at, parseISO, format("PPPP"))}</Typography>
      <Editor
        content={{ storageKey: "test", editorState: content }}
        editable={false}
      />
    </Link>
  </Box>
)

type NewsViewProperties = {
  contentList: ListContentByNamespaceQuery["listContentByNamespace"]
}

const NewsView = ({ contentList }: NewsViewProperties) => {
  const { container, header } = useStyles()
  return pipe(
    contentList,
    Amap(({ id, content, updated_at }) => (
      <NewsItem key={id} id={id} updated_at={updated_at} content={content} />
    )),
    (items) => (
      <Container className={container}>
        <Box className={header}>
          <Typography variant="h1" align="center">
            News
          </Typography>
        </Box>
        <>{items}</>
      </Container>
    ),
  )
}

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

// eslint-disable-next-line import/no-default-export
export default News
