import { useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { pipe, flow } from "fp-ts/function"
import { filter as Mfilter } from "fp-ts/Map"
import { elem as SETelem, toArray as SETtoArray } from "fp-ts/Set"
import { filter as Afilter, filterMap as AfilterMap } from "fp-ts/Array"
import { map as Omap, fromPredicate as OfromPredicate } from "fp-ts/Option"
import { P, match } from "ts-pattern"
import { Ord as SOrd, Eq as SEq } from "fp-ts/string"
import {
  usePlasmidListFilterQuery,
  PlasmidListFilter,
  PlasmidType,
} from "dicty-graphql-schema"

import {
  graphqlListVariables,
  buildPlasmidListFilter,
} from "@dictybase/hook-dsc"
import { useIntersectionObserver } from "@dictybase/hook"
import {
  WindowHeightWrapper,
  PlasmidCatalogTableDisplay,
  SearchBarPlasmid,
  ErrorDisplay,
  CatalogListWrapper,
  CatalogListLoader,
  CatalogHeader,
} from "@dictybase/ui-dsc"

const PlasmidCatalog = () => {
  const [searchParameters] = useSearchParams()

  const { loading, error, data, fetchMore, refetch } =
    usePlasmidListFilterQuery({
      variables: {
        ...graphqlListVariables,
        filter: buildPlasmidListFilter(searchParameters),
      },
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

  return (
    <>
      <CatalogHeader title="Plasmid Catalog" />
      <SearchBarPlasmid />
      <WindowHeightWrapper>
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
      </WindowHeightWrapper>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default PlasmidCatalog
