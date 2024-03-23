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
  strainConfig,
  graphqlQueryVariables,
  fieldsToVariables,
  baseConfig,
} from "./graphql_config"
import {
  StrainCatalogSearchProperties,
  SearchConfigMember,
  ConfigureStrainCatalogSearchGraphql,
} from "./types"

export function getStrainListConfiguration({
  searchParams,
  value,
}: StrainCatalogSearchProperties) {
  const initValues: ConfigureStrainCatalogSearchGraphql = {
    dataField: baseConfig.dataField,
    variables: {
      filter: { strain_type: StrainType.Regular },
      ...graphqlQueryVariables,
    },
  }
  const strainCatalogDataFieldLens =
    Lens.fromProp<ConfigureStrainCatalogSearchGraphql>()("dataField")
  const filterLens = Lens.fromPath<ConfigureStrainCatalogSearchGraphql>()([
    "variables",
    "filter",
  ])

  const filterStrainConfig = (config: SearchConfigMember) =>
    config.value === value
  const dataFieldLens = Lens.fromProp<SearchConfigMember>()("dataField")
  const graphqlFilterLens = Lens.fromProp<SearchConfigMember>()("graphqlFilter")
  const basePipe = flow(
    RAfilter(filterStrainConfig),
    RAhead,
    OgetOrElse(() => RNAhead(strainConfig())),
  )
  const dataFieldPipe = pipe(strainConfig(), basePipe, dataFieldLens.get)
  const strainTypeFilterPipe = pipe(
    strainConfig(),
    basePipe,
    graphqlFilterLens.get,
  )
  const additionalfiltersPipe = pipe(
    fieldsToVariables,
    Rkeys,
    RAfilter((field) => searchParams.has(field)),
    RAreduce({}, (accumulator, field: string) => ({
      ...accumulator,
      [fieldsToVariables[field] as string]: searchParams.get(field),
    })),
  )
  return pipe(
    initValues,
    strainCatalogDataFieldLens.set(dataFieldPipe),
    filterLens.set({ ...strainTypeFilterPipe, ...additionalfiltersPipe }),
  )
}
