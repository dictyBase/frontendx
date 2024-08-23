import { Grid, Typography } from "@material-ui/core"
import { ListContentByNamespaceQuery } from "dicty-graphql-schema"
import { Link } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { slice as Sslice } from "fp-ts/string"
import { map as Amap } from "fp-ts/Array"
import { parseISO, format } from "date-fns/fp"
import { parseContentToText } from "@dictybase/editor"
import { truncateString } from "../utils/truncateString"

type NewsListProperties = {
  contentList: ListContentByNamespaceQuery["listContentByNamespace"]
}

const AuthorizedNewsList = ({ contentList }: NewsListProperties) => (
  <Grid container spacing={1} direction="column">
    {pipe(
      contentList,
      Amap(({ name, content, updated_at }) => {
        const previewText = pipe(content, parseContentToText, Sslice(0, 400))
        return (
          <Grid key={name} item>
            <Grid spacing={1} container direction="column">
              <Grid item>
                <Link to={`/news/${name}/editable`}>
                  <Typography variant="h3">
                    {pipe(updated_at, parseISO, format("PPPP"))}
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Typography>{truncateString(previewText, 300)}</Typography>
              </Grid>
            </Grid>
          </Grid>
        )
      }),
    )}
  </Grid>
)

export { AuthorizedNewsList }
