import { useEffect } from "react"
import { Grid, Container } from "@material-ui/core"
import { useListNewsContentQuery } from "dicty-graphql-schema"
import { useAtomValue } from "jotai"
import { selectedArticlesAtom } from "./atomConfigs"
import NewsList from "./NewsList"
import NewsHeader from "./NewsHeader"
import CreateButton from "./CreateButton"
import DeleteButton from "./DeleteButton"
/**
 * Renders a list of news articles.
 * @returns
 */
const BrowseNews = () => {
  const selectedArticles = useAtomValue(selectedArticlesAtom)
  const { loading, error, data, refetch } = useListNewsContentQuery({
    fetchPolicy: "no-cache",
  })
  useEffect(() => {
    refetch()
  }, [refetch, selectedArticles])

  if (error) return <div> Error </div>
  if (loading) return <div> Loading </div>
  if (!data) return <div> Fallback </div>

  return (
    <Container>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <NewsHeader
            button={
              <Grid container spacing={1}>
                {selectedArticles.length > 0 ? (
                  <Grid item>
                    <DeleteButton />
                  </Grid>
                ) : (
                  <></>
                )}
                <Grid item>
                  <CreateButton />
                </Grid>
              </Grid>
            }
          />
        </Grid>
        <NewsList articles={data?.listContent} />
      </Grid>
    </Container>
  )
}

export default BrowseNews
