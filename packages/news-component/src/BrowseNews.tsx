import { useEffect } from "react"
import { Grid, Container } from "@material-ui/core"
import { useListNewsContentQuery } from "dicty-graphql-schema"
import { useAtomValue, useSetAtom } from "jotai"
import { articlesInRangeAtom, articlesListTotalAtom } from "./atomConfigs"
import NewsLayout from "./NewsLayout"
import NewsList from "./NewsList"
import NewsHeader from "./NewsHeader"
import NewsToolbar from "./Toolbar"
import Pagination from "./Pagination"

type BrowseNewsProperties = {
  isAuthenticated?: boolean
}
/**
 * Renders a list of news articles.
 * @returns
 */
const BrowseNews = ({ isAuthenticated = false }: BrowseNewsProperties) => {
  const articlesInRange = useAtomValue(articlesInRangeAtom)
  const setTotalArticles = useSetAtom(articlesListTotalAtom)
  const { loading, error, data, refetch } = useListNewsContentQuery()

  useEffect(() => {
    setTotalArticles(data?.listContent?.length || 0)
    refetch()
  })

  if (error) return <div> Error </div>
  if (loading) return <div> Loading </div>
  if (!data || !data.listContent) return <div> Fallback </div>

  return (
    <>
      <NewsList
        selectable={isAuthenticated}
        articles={data?.listContent.slice(
          articlesInRange[0],
          articlesInRange[1],
        )}
      />
      <Grid item>
        <Pagination />
      </Grid>
    </>
  )
}

export default BrowseNews
