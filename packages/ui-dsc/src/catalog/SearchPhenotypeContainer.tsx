import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import { P, match } from "ts-pattern"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { useListStrainsWithPhenotypeQuery } from "dicty-graphql-schema"
import { GraphQLErrorPage } from "@dictybase/ui-frontpage"
import { DetailsLoader } from "./DetailsLoader"
import { SearchResultsHeader } from "./SearchResultsHeader"
import { SearchPhenotypeList } from "./SearchPhenotypeList"

const useStyles = makeStyles({
  container: {
    textAlign: "center",
  },
  gridItem: {
    marginTop: "10px",
    marginBottom: "20px",
  },
  resultsText: {
    marginTop: "20px !important",
  },
})

// remove "+" from phenotype params to get the proper name
// i.e. "abolished+protein+phosphorylation" = "abolished protein phosphorylation"
const cleanQuery = (phenotype: string) => phenotype.split("+").join(" ")

const dataPattern = {
  data: {
    listStrainsWithAnnotation: {
      totalCount: P.select("totalCount"),
      strains: P.select("strains"),
    },
  },
}
/**
 * Custom hook to handle all fetching/refetching logic
 * */
const useListStrainsWithPhenotype = (phenotype: string) => {
  const [hasMore, setHasMore] = React.useState(true)
  const [isLoadingMore, setIsLoadingMore] = React.useState(false)
  const [previousCursor, setPreviousCursor] = React.useState(0)
  const { loading, error, data, fetchMore } = useListStrainsWithPhenotypeQuery({
    variables: {
      cursor: 0,
      limit: 50,
      type: "phenotype",
      annotation: phenotype,
    },
    errorPolicy: "all",
  })
  const loadMoreItems = async () => {
    const newCursor = data?.listStrainsWithAnnotation?.nextCursor ?? 0
    // need to check for same cursor to prevent extra fetching
    // https://github.com/apollographql/apollo-client/issues/5901
    if (newCursor === previousCursor || newCursor === 0) {
      return
    }
    setPreviousCursor(newCursor)
    setIsLoadingMore(true)
    const result = await fetchMore({
      variables: {
        cursor: newCursor,
        limit: 50,
        type: "phenotype",
        annotation: phenotype,
      },
    })
    if (result.data) {
      setIsLoadingMore(false)
    }
    if (result.data?.listStrainsWithAnnotation?.nextCursor === 0) {
      setHasMore(false)
    }
  }

  return {
    loading,
    error,
    data,
    loadMoreItems,
    hasMore,
    isLoadingMore,
  }
}

/**
 * PhenotypeContainer is used to fetch a list of strains with a given phenotype.
 */

const SearchPhenotypeContainer = () => {
  const classes = useStyles()
  const { name } = useParams()
  const phenotype = cleanQuery(name ?? "")
  const { loading, error, data, loadMoreItems, hasMore, isLoadingMore } =
    useListStrainsWithPhenotype(phenotype)

  return (
    <>
      <Helmet>
        <title>
          Phenotype Search Results for {phenotype} - Dicty Stock Center
        </title>
        <meta
          name="description"
          content={`Dicty Stock Center search results for strains with ${phenotype}`}
        />
      </Helmet>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.gridItem}>
          <SearchResultsHeader property="Phenotype" description={phenotype} />
        </Grid>
        <Grid item xs={12}>
          {match({ loading, error, data })
            .with(dataPattern, ({ totalCount, strains }) => (
              <SearchPhenotypeList
                loadMore={loadMoreItems}
                hasMore={hasMore}
                isLoadingMore={isLoadingMore}
                data={strains}
                totalCount={totalCount}
              />
            ))
            .with({ loading: true }, () => <DetailsLoader />)
            .with({ error: P.select(P.not(undefined)) }, (error_) => (
              <GraphQLErrorPage error={error_} />
            ))
            .otherwise(() => (
              <> This message should not appear. </>
            ))}
        </Grid>
      </Grid>
    </>
  )
}

export { SearchPhenotypeContainer }
