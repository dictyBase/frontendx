import React from "react"
import { useSearchParams, useParams } from "react-router-dom"
import { P, match } from "ts-pattern"
import { makeStyles } from "tss-react/mui"
import { Grid } from "@mui/material"
import { PageLayout, FullPageLoadingDisplay } from "@dictybase/ui-common"
import { useListStrainsWithPhenotypeQuery } from "dicty-graphql-schema"
import { ErrorPageWrapper } from "../ErrorPageWrapper"
import { SearchResultsHeader } from "./SearchResultsHeader"
import { SearchPhenotypeList } from "./SearchPhenotypeList"
import { SearchPhenotypeForm } from "./SearchPhenotypeForm"

const useStyles = makeStyles()({
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

// Build phenotype annotation from quality and entity query parameters
// e.g. quality="abolished", entity="protein phosphorylation" → "abolished protein phosphorylation"
// e.g. quality="wild type" → "wild type"
const buildAnnotation = (quality: string, entity: string) => {
  if (!quality) return ""
  if (quality === "wild type" || !entity) return quality
  return `${quality} ${entity}`
}

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
  const { classes } = useStyles()
  const [searchParams] = useSearchParams()
  const { name } = useParams()
  const quality = searchParams.get("quality") ?? ""
  const entity = searchParams.get("entity") ?? ""
  const phenotype = buildAnnotation(quality, entity) || cleanQuery(name ?? "")
  const { loading, error, data, loadMoreItems, hasMore, isLoadingMore } =
    useListStrainsWithPhenotype(phenotype)

  return (
    <PageLayout
      title={`Phenotype Search Results for ${phenotype} - Dicty Stock Center`}
      metaContent={`Dicty Stock Center search results for strains with ${phenotype}`}>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.gridItem}>
          <SearchPhenotypeForm />
        </Grid>
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
            .with({ loading: true }, () => <FullPageLoadingDisplay />)
            .with({ error: P.select(P.not(undefined)) }, (error_) => (
              <ErrorPageWrapper error={error_} />
            ))
            .otherwise(() => (
              <> This message should not appear. </>
            ))}
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export { SearchPhenotypeContainer }
