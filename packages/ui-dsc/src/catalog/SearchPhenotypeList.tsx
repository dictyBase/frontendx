import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import CircularProgress from "@material-ui/core/CircularProgress"
import { useIntersectionObserver } from "dicty-hooks"
import { Strain } from "dicty-graphql-schema"
import { SearchPhenotypeListHeader } from "./SearchPhenotypeListHeader"
import { SearchPhenotypeListItem } from "./SearchPhenotypeListItem"

const useStyles = makeStyles(({ palette }) => ({
  list: {
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  loading: {
    color: palette.secondary.main,
  },
  spinner: {
    marginTop: "15px",
  },
  totalCount: {
    marginTop: "15px",
    textAlign: "center",
    color: "rgb(112, 117, 122)",
  },
}))

type SearchPhenotypeListProperties = {
  /** Array of strains with given phenotype */
  data: Array<Strain>
  /** Function to load more data */
  loadMore: () => void
  /** Indicator for having more content */
  hasMore: boolean
  /** Indicator to determine if more data is being loaded */
  isLoadingMore: boolean
  /** Total number of strains found with given phenotype */
  totalCount: number
}

/**
 * SearchPhenotypeList is used to display a list of phenotypes.
 */

const SearchPhenotypeList = ({
  data,
  loadMore,
  hasMore,
  isLoadingMore,
  totalCount,
}: SearchPhenotypeListProperties) => {
  const { intersecting, ref } = useIntersectionObserver()
  const classes = useStyles()

  React.useEffect(() => {
    if (intersecting && hasMore) {
      loadMore()
    }
  }, [hasMore, loadMore, intersecting])

  return (
    <>
      <Paper>
        <SearchPhenotypeListHeader />
        <List className={classes.list}>
          {data.map((item: Strain) => (
            <SearchPhenotypeListItem key={item.id} strain={item} />
          ))}
          <div ref={ref} />
        </List>
      </Paper>
      {isLoadingMore && <CircularProgress className={classes.spinner} />}
      <div className={classes.totalCount}>Displaying {totalCount} results</div>
    </>
  )
}

export { SearchPhenotypeList }
