import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import { P, match } from "ts-pattern"
import Grid from "@mui/material/Grid"
import { useListStrainsWithPhenotypeQuery } from "dicty-graphql-schema"
import { ErrorPageWrapper } from "../ErrorPageWrapper"
import { DetailsLoader } from "./DetailsLoader"
import { SearchResultsHeader } from "./SearchResultsHeader"
import { SearchPhenotypeList } from "./SearchPhenotypeList"


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
      <Grid container sx={{ textAlign: "center" }}>
        <Grid item xs={12} sx={{
          marginTop: "10px",
          marginBottom: "20px",
        }}>
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
              <ErrorPageWrapper error={error_} />
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
