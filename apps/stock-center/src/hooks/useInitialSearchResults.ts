import { pipe } from "fp-ts/function"
import { Option, map as Omap, getOrElse as OgetOrElse } from "fp-ts/Option"
import { findFirst as AfindFirst, concat as Aconcat } from "fp-ts/Array"
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
  } = usePlasmidListFilterQuery({
    variables: {
      ...graphqlListVariables,
      filter: {
        plasmid_type: getPlasmidTypeFromGroup(groupValue),
      },
    },
    skip: !shouldFetchPlasmids,
  })

  const strainResults = (dataStrains?.listStrains?.strains ??
    []) as Array<CatalogItem>
  const plasmidResults = (dataPlasmids?.listPlasmids?.plasmids ??
    []) as Array<CatalogItem>

  const data = match(entity)
    .with(ENTITY_STRAIN, () => strainResults)
    .with(ENTITY_PLASMID, () => plasmidResults)
    .otherwise(() => pipe(strainResults, Aconcat(plasmidResults)))

  const loading = loadingStrains || loadingPlasmids
  const error = errorStrains || errorPlasmids

  return {
    data: data.length > 0 ? data : undefined,
    loading,
    error,
  }
}

export { useInitialSearchResults }
