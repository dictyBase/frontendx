import React from "react"
import Paper from "@mui/material/Paper"
import List from "@mui/material/List"
import CircularProgress from "@mui/material/CircularProgress"
import { useIntersectionObserver } from "dicty-hooks"
import { ListStrainsWithPhenotypeQuery } from "dicty-graphql-schema"
import { SearchPhenotypeListHeader } from "./SearchPhenotypeListHeader"
import { SearchPhenotypeListItem } from "./SearchPhenotypeListItem"


type SearchPhenotypeListProperties = {
  /** Array of strains with given phenotype */
  data: NonNullable<
    ListStrainsWithPhenotypeQuery["listStrainsWithAnnotation"]
  >["strains"]
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

  React.useEffect(() => {
    if (intersecting && hasMore) {
      loadMore()
    }
  }, [hasMore, loadMore, intersecting])

  return (
    <>
      <Paper>
        <SearchPhenotypeListHeader />
        <List sx={{
          paddingTop: "0px",
          paddingBottom: "0px",
        }}>
          {data.map((item) => (
            <SearchPhenotypeListItem key={item.id} strain={item} />
          ))}
          <div ref={ref} />
        </List>
      </Paper>
      {isLoadingMore && <CircularProgress sx={{ marginTop: "15px" }} />}
      <div style={{
        marginTop: "15px",
        textAlign: "center",
        color: "rgb(112, 117, 122)",
      }}>Displaying {totalCount} results</div>
    </>
  )
}

export { SearchPhenotypeList }
