import {
  filter as RAfilter,
  reduce as RAreduce,
  head as RAhead,
} from "fp-ts/ReadonlyArray"
import { getOrElse as OgetOrElse } from "fp-ts/Option"
import { head as RNAhead } from "fp-ts/ReadonlyNonEmptyArray"
import { keys as Rkeys } from "fp-ts/Record"
import { flow, pipe } from "fp-ts/function"
import { Lens } from "monocle-ts"
import { StrainType } from "dicty-graphql-schema"
import {
  strainGroupFilterEntries,
  graphqlListVariables,
  variablesFromStrainParameters,
  baseConfig,
} from "./graphql_config"
import {
  StrainCatalogSearchProperties,
  SearchConfigMember,
  ConfigureStrainCatalogSearchGraphql,
} from "./types"

/**
 * getStrainListConfiguration takes the URL search parameters and makes adapts them to be used in the StrainList GraphQL query.
 */
export function getStrainListConfiguration({
  searchParams,
  filterParameterValue,
}: StrainCatalogSearchProperties) {
  const initValues: ConfigureStrainCatalogSearchGraphql = {
    dataField: baseConfig.dataField,
    variables: {
      filter: { strain_type: StrainType.Regular },
      ...graphqlListVariables,
    },
  }
  const isSearchParameterMatch = (config: SearchConfigMember) =>
    config.value === filterParameterValue

  const basePipe = flow(
    RAfilter(isSearchParameterMatch),
    RAhead,
    OgetOrElse(() => RNAhead(strainGroupFilterEntries)),
  )
  const graphqlFilterLens = Lens.fromProp<SearchConfigMember>()("graphqlFilter")

  // Get the filter config that matches `value`.
  const strainTypeFilterPipe = pipe(
    strainGroupFilterEntries,
    basePipe,
    graphqlFilterLens.get,
  )

  // Adds any other valid search parameters to the query filter.
  const additionalfiltersPipe = pipe(
    variablesFromStrainParameters,
    Rkeys,
    RAfilter((field) => searchParams.has(field)),
    RAreduce({}, (accumulator, field: string) => ({
      ...accumulator,
      [variablesFromStrainParameters[field] as string]: searchParams.get(field),
    })),
  )

  const filterLens = Lens.fromPath<ConfigureStrainCatalogSearchGraphql>()([
    "variables",
    "filter",
  ])

  // Modify the initial values with the selected filters and other search parameters.
  return pipe(
    initValues,
    filterLens.set({ ...strainTypeFilterPipe, ...additionalfiltersPipe }),
  )
}
