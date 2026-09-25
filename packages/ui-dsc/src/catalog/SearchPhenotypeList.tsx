import { useRef, useCallback } from "react"
import { makeStyles } from "tss-react/mui"
import Paper from "@mui/material/Paper"
import List from "@mui/material/List"
import LinearProgress from "@mui/material/LinearProgress"
import { useIntersectionObserver } from "@dictybase/hook"
import { ListStrainsWithPhenotypeQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { SearchPhenotypeListHeader } from "./SearchPhenotypeListHeader"
import { SearchPhenotypeListItem } from "./SearchPhenotypeListItem"

const useStyles = makeStyles()(({ palette }) => ({
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
  const { classes } = useStyles()
  const targetReference = useRef<HTMLDivElement>(null)
  const onIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry?.isIntersecting && hasMore && !isLoadingMore) loadMore()
    },
    [hasMore, loadMore, isLoadingMore],
  )
  useIntersectionObserver({
    target: targetReference,
    onIntersection,
    option: { threshold: 0.1 },
  })
  return (
    <>
      <Paper>
        <SearchPhenotypeListHeader />
        <List className={classes.list}>
          {data.map((item) => (
            <SearchPhenotypeListItem key={item.id} strain={item} />
          ))}
          {pipe(
            hasMore,
            Bmatch(
              () => <></>,
              () => <LinearProgress ref={targetReference} />,
            ),
          )}
        </List>
      </Paper>
      <div className={classes.totalCount}>Displaying {totalCount} results</div>
    </>
  )
}

export { SearchPhenotypeList }
