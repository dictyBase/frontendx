import {
  Container,
  Typography,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core"
import { match, P } from "ts-pattern"
import {
  useListContentByNamespaceQuery,
  ListContentByNamespaceQuery,
} from "dicty-graphql-schema"
import { parseContentToText } from "@dictybase/editor"
import AnnouncementIcon from "@material-ui/icons/Announcement"
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { slice as Sslice } from "fp-ts/string"
import { map as Amap } from "fp-ts/Array"

const useDictyNewsStyles = makeStyles((theme) => ({
  root: {},
  main: {
    height: "440px",
  },
  top: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  middle: {
    boxShadow: "inset 0px -2px",
  },
  bottom: {
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  newsListItem: {
    overflow: "auto",
  },
  link: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "inherit",
      color: "red",
    },
  },
  newsIcon: {
    display: "block",
  },
}))

const DictyNewsTitle = () => {
  const { newsIcon } = useDictyNewsStyles()
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <Typography variant="h1">Dicty News</Typography>
      </Grid>
      <Grid item>
        <AnnouncementIcon className={newsIcon} />
      </Grid>
    </Grid>
  )
}

type NewsListProperties = {
  contentList: ListContentByNamespaceQuery["listContentByNamespace"]
}

const NewsList = ({ contentList }: NewsListProperties) => (
  <Grid container spacing={1} direction="column">
    {pipe(
      contentList,
      Amap(({ id, content, updated_at }) => {
        const previewText = pipe(content, parseContentToText, Sslice(0, 400))
        return (
          <Grid key={id} item>
            <Typography variant="h3">{updated_at}</Typography>
            <Typography>{`${previewText}...`}</Typography>
          </Grid>
        )
      }),
    )}
  </Grid>
)

const MoreNewsLink = () => {
  const { link } = useDictyNewsStyles()
  return (
    <Grid justifyContent="flex-end" container>
      <Grid item>
        <Link to="/#">
          <Button className={link} endIcon={<DoubleArrowIcon />}>
            <Typography variant="h2"> More News </Typography>
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

const DictyNews = () => {
  const { root, main, newsListItem } = useDictyNewsStyles()
  const fetchState = useListContentByNamespaceQuery({
    variables: { namespace: "news" },
    fetchPolicy: "cache-and-network",
  })
  return (
    <Container className={root}>
      <Grid
        direction="column"
        spacing={1}
        container
        wrap="nowrap"
        className={main}>
        <Grid item>
          <DictyNewsTitle />
        </Grid>
        <Grid item className={newsListItem}>
          {match(fetchState)
            .with(
              {
                data: {
                  listContentByNamespace: P.select(
                    P.array({ content: P.string }),
                  ),
                },
              },
              (contentList) => <NewsList contentList={contentList} />,
            )
            .with({ loading: true }, () => <> Loading </>)
            .with({ error: P.select(P.not(undefined)) }, (error) => (
              <>{error.message}</>
            ))
            .otherwise(() => (
              <> This message should not appear. </>
            ))}
        </Grid>
        <Grid item>
          <MoreNewsLink />
        </Grid>
      </Grid>
    </Container>
  )
}

export { DictyNews }
