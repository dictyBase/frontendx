import { useCallback, useMemo } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  type Option,
  fromNullable as OfromNullable,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import {
  findFirst as AfindFirst,
  concat as Aconcat,
  match as Amatch,
} from "fp-ts/Array"
import { match } from "ts-pattern"
import {
  StrainType,
  PlasmidType,
  usePlasmidListFilterQuery,
  useStrainListQuery,
} from "dicty-graphql-schema"
import type { CatalogItem } from "@dictybase/ui-dsc"
import {
  graphqlListVariables,
  plasmidGroupFilterOptions,
  strainGroupFilterOptions,
} from "@dictybase/hook-dsc"

const ENTITY_STRAIN = "strain"
const ENTITY_PLASMID = "plasmid"
const ENTITY_ALL = "all"

const getStrainTypeFromGroup = (groupValue: string): StrainType =>
  pipe(
    strainGroupFilterOptions,
    AfindFirst(({ value }) => value === groupValue),
    Omap(({ graphqlFilter }) => graphqlFilter.strain_type),
    OgetOrElse(() => StrainType.All as StrainType),
  )

const getPlasmidTypeFromGroup = (groupValue: string): PlasmidType =>
  pipe(
    plasmidGroupFilterOptions,
    AfindFirst(({ value }) => value === groupValue),
    Omap(({ graphqlFilter }) => graphqlFilter.plasmid_type),
    OgetOrElse(() => PlasmidType.All as PlasmidType),
  )

type UseInitialSearchResultsParameters = {
  entity: string
  group: Option<string>
  skip: boolean
}

const useInitialSearchResults = ({
  entity,
  group,
  skip,
}: UseInitialSearchResultsParameters) => {
  const groupValue = pipe(
    group,
    OgetOrElse(() => ENTITY_ALL),
  )

  const shouldFetchStrains =
    !skip && (entity === ENTITY_STRAIN || entity === ENTITY_ALL)
  const shouldFetchPlasmids =
    !skip && (entity === ENTITY_PLASMID || entity === ENTITY_ALL)

  const {
    loading: loadingStrains,
    error: errorStrains,
    data: dataStrains,
    fetchMore: fetchMoreStrains,
  } = useStrainListQuery({
    variables: {
      ...graphqlListVariables,
      filter: {
        strain_type: getStrainTypeFromGroup(groupValue),
      },
    },
    skip: !shouldFetchStrains,
  })

  const {
    loading: loadingPlasmids,
    error: errorPlasmids,
    data: dataPlasmids,
    fetchMore: fetchMorePlasmids,
  } = usePlasmidListFilterQuery({
    variables: {
      ...graphqlListVariables,
      filter: {
        plasmid_type: getPlasmidTypeFromGroup(groupValue),
      },
    },
    skip: !shouldFetchPlasmids,
  })

  const data = useMemo(() => {
    const strainResults = pipe(
      dataStrains?.listStrains?.strains as Array<CatalogItem> | undefined,
      OfromNullable,
      OgetOrElse((): Array<CatalogItem> => []),
    )
    const plasmidResults = pipe(
      dataPlasmids?.listPlasmids?.plasmids as Array<CatalogItem> | undefined,
      OfromNullable,
      OgetOrElse((): Array<CatalogItem> => []),
    )

    const combined = match(entity)
      .with(ENTITY_STRAIN, () => strainResults)
      .with(ENTITY_PLASMID, () => plasmidResults)
      .otherwise(() => pipe(strainResults, Aconcat(plasmidResults)))

    return pipe(
      combined,
      Amatch(
        () => undefined,
        (d) => d,
      ),
    )
  }, [dataStrains, dataPlasmids, entity])

  const strainNextCursor = pipe(
    dataStrains?.listStrains?.nextCursor,
    OfromNullable,
    OgetOrElse(() => 0),
  )

  const plasmidNextCursor = pipe(
    dataPlasmids?.listPlasmids?.nextCursor,
    OfromNullable,
    OgetOrElse(() => 0),
  )

  const nextCursor = match(entity)
    .with(ENTITY_STRAIN, () => strainNextCursor)
    .with(ENTITY_PLASMID, () => plasmidNextCursor)
    .otherwise(() =>
      pipe(
        strainNextCursor > 0,
        Bmatch(
          () => plasmidNextCursor,
          () => strainNextCursor,
        ),
      ),
    )

  const loadMore = useCallback(() => {
    if (shouldFetchStrains && strainNextCursor > 0 && !loadingStrains) {
      fetchMoreStrains({ variables: { cursor: strainNextCursor } })
    }
    if (shouldFetchPlasmids && plasmidNextCursor > 0 && !loadingPlasmids) {
      fetchMorePlasmids({ variables: { cursor: plasmidNextCursor } })
    }
  }, [
    shouldFetchStrains,
    strainNextCursor,
    loadingStrains,
    fetchMoreStrains,
    shouldFetchPlasmids,
    plasmidNextCursor,
    loadingPlasmids,
    fetchMorePlasmids,
  ])

  const loading = loadingStrains || loadingPlasmids
  const error = errorStrains || errorPlasmids

  return {
    data,
    loading,
    error,
    nextCursor,
    loadMore,
  }
}

export { useInitialSearchResults }
