import { useEffect } from "react"
import { Grid, Typography } from "@material-ui/core"
import { useListNewsContentQuery } from "dicty-graphql-schema"
import { RecentNewsList } from "./RecentNewsList"
import { useNewsContainerStyles } from "./useNewsContainerStyles"

const RecentNewsContainer = () => {
  const { root } = useNewsContainerStyles()
  const { error, loading, data, refetch } = useListNewsContentQuery()

  useEffect(() => {
    refetch()
  })

  return (
    <Grid container spacing={1} direction="column" className={root}>
      <Grid item>
        <Typography variant="h1">Dicty News</Typography>
      </Grid>
      <Grid item>
        {error ? <div> Error </div> : <></>}
        {loading ? <div> Loading </div> : <></>}
        {data?.listContent ? (
          <RecentNewsList articles={data?.listContent} />
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  )
}
export { RecentNewsContainer }
