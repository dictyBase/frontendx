import { Grid, Typography, makeStyles } from "@material-ui/core"
import { ListContentByNamespaceQuery } from "dicty-graphql-schema"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { slice as Sslice } from "fp-ts/string"
import { map as Amap } from "fp-ts/Array"
import { parseISO, format } from "date-fns/fp"
import { parseContentToText } from "@dictybase/editor"
import { truncateString } from "../utils/truncateString"

const useNewsListStyles = makeStyles({
  newsItem: {
    padding: "0.5rem",
  },
})

type NewsListProperties = {
  contentList: ListContentByNamespaceQuery["listContentByNamespace"]
}

const NewsList = ({ contentList }: NewsListProperties) => {
  const { newsItem } = useNewsListStyles()
  return (
    <Grid container spacing={1} direction="column">
      {pipe(
        contentList,
        Amap(({ name, content, updated_at }) => {
          const previewText = pipe(content, parseContentToText, Sslice(0, 400))
          return (
            <Grid key={name} item>
              <Link to={`/news/${name}/show`}>
                <Grid
                  className={newsItem}
                  spacing={1}
                  container
                  direction="column">
                  <Grid item>
                    <Typography variant="h3">
                      {pipe(updated_at, parseISO, format("PPPP"))}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography color="textPrimary">{truncateString(previewText, 300)}</Typography>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          )
        }),
      )}
    </Grid>
  )
}

export { NewsList }
