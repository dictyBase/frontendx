import { Theme, Box, makeStyles } from "@material-ui/core"
import { graphqlQueryVariables } from "@dictybase/hook-dsc"
import { useWindowSize, useIntersectionObserver } from "@dictybase/hook"
import { P, match } from "ts-pattern"
import {
  LoadingDisplay,
  PlasmidCatalogTableDisplay,
  ErrorDisplay,
  CatalogListWrapper,
  CatalogListLoader,
  CatalogHeader,
} from "@dictybase/ui-dsc"
import { useRef } from "react"
import { usePlasmidListFilterQuery } from "dicty-graphql-schema"

type HeightProperties = {
  height: number
}

const useStyles = makeStyles<Theme, HeightProperties>({
  root: {
    height: ({ height }) => height,
  },
})

const PlasmidCatalog = () => {
  const { loading, error, data, fetchMore, refetch } =
    usePlasmidListFilterQuery({
      variables: { ...graphqlQueryVariables, filter: "" },
    })

  const rootReference = useRef<HTMLDivElement>(null)
  const targetReference = useRef<HTMLTableRowElement>(null)
  const onIntersection = ([entry]: IntersectionObserverEntry[]) => {
    const nextCursor = data?.listPlasmids?.nextCursor
    switch (true) {
      case !nextCursor:
        return
      case loading:
        return
      case !entry.isIntersecting:
        return
      default:
        fetchMore({ variables: { cursor: nextCursor } })
    }
  }

  useIntersectionObserver({
    target: targetReference,
    onIntersection,
    option: { root: rootReference.current, threshold: 0.1 },
  })

  const { height: windowHeight } = useWindowSize()
  const classes = useStyles({ height: windowHeight * 0.6 })

  return (
    <>
      <CatalogHeader title="Plasmid Catalog" />
      {/* <SearchBar /> */}
      <Box className={classes.root}>
        {match({ data, loading, error })
          .with(
            { data: P.select({ listPlasmids: P.not(undefined) }) },
            (data_) => (
              <CatalogListWrapper root={rootReference}>
                <PlasmidCatalogTableDisplay
                  data={data_}
                  dataField="listPlasmids"
                  target={targetReference}
                />
              </CatalogListWrapper>
            ),
          )
          .with({ loading: true }, () => <CatalogListLoader />)
          .with({ error: P.select({ message: P.string }) }, (error_) => (
            <ErrorDisplay error={error_} refetch={refetch} />
          ))
          .otherwise(() => (
            <></>
          ))}
      </Box>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default PlasmidCatalog
