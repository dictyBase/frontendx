import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { P, match } from "ts-pattern"
import { makeStyles } from "tss-react/mui"
import { Grid } from "@mui/material"
import { PageLayout, FullPageLoadingDisplay } from "@dictybase/ui-common"
import { useListStrainsWithPhenotypeQuery } from "dicty-graphql-schema"
import { ErrorPageWrapper } from "../ErrorPageWrapper"
import { SearchResultsHeader } from "./SearchResultsHeader"
import { SearchPhenotypeList } from "./SearchPhenotypeList"
import { SearchPhenotypeForm } from "./SearchPhenotypeForm"
import { PhenotypeEmptyDisplay } from "./PhenotypeEmptyDisplay"
import { PhenotypeNoResultsDisplay } from "./PhenotypeNoResultsDisplay"
import { hasNotFoundError } from "../utils/hasNotFoundError"
import { cleanQuery } from "../utils/cleanQuery"

const useStyles = makeStyles()({
  container: {
    textAlign: "center",
  },
  gridItem: {
    marginTop: "10px",
    marginBottom: "20px",
  },
})

const dataPattern = {
  data: {
    listStrainsWithAnnotation: {
      totalCount: P.select("totalCount"),
      strains: P.select("strains"),
    },
  },
}

/**
 * Custom hook to handle all fetching/refetching logic for strains with a
 * given phenotype annotation.
 * @param phenotype the phenotype annotation used to filter strains
 */
const useListStrainsWithPhenotype = (phenotype: string) => {
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [previousCursor, setPreviousCursor] = useState(0)
  const { loading, error, data, fetchMore } = useListStrainsWithPhenotypeQuery({
    variables: {
      cursor: 0,
      limit: 50,
      type: "phenotype",
      annotation: phenotype,
    },
    skip: !phenotype,
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
  }

  useEffect(() => {
    if (data?.listStrainsWithAnnotation?.nextCursor === 0) {
      setHasMore(false)
    }
  }, [data, setHasMore])

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
 * SearchPhenotypeContainer is used to fetch a list of strains with a given
 * phenotype. The phenotype is read from the "name" URL parameter and passed
 * down to the search results.
 */
const SearchPhenotypeContainer = () => {
  const { classes } = useStyles()
  const { name } = useParams()
  const phenotype = cleanQuery(name ?? "")
  const { loading, error, data, loadMoreItems, hasMore, isLoadingMore } =
    useListStrainsWithPhenotype(phenotype)

  return (
    <PageLayout
      title={`Phenotype Search Results for ${phenotype} - Dicty Stock Center`}
      metaContent={`Dicty Stock Center search results for strains with ${phenotype}`}>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.gridItem}>
          <SearchResultsHeader property="Phenotype" description={phenotype} />
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <SearchPhenotypeForm />
        </Grid>
        <Grid item xs={12}>
          {match({ loading, error, data })
            .with(
              {
                data: { listStrainsWithAnnotation: { totalCount: 0 } },
              },
              () => <PhenotypeNoResultsDisplay phenotype={phenotype} />,
            )
            .with(dataPattern, ({ totalCount, strains }) => (
              <SearchPhenotypeList
                loadMore={loadMoreItems}
                hasMore={hasMore}
                isLoadingMore={isLoadingMore}
                data={strains}
                totalCount={totalCount}
              />
            ))
            .with({ loading: true }, () => <FullPageLoadingDisplay />)
            .with({ error: P.when(hasNotFoundError) }, () => (
              <PhenotypeNoResultsDisplay phenotype={phenotype} />
            ))
            .with({ error: P.select(P.not(undefined)) }, (error_) => (
              <ErrorPageWrapper error={error_} />
            ))
            .otherwise(() => (
              <PhenotypeEmptyDisplay />
            ))}
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export { SearchPhenotypeContainer }
