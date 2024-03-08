import { filter as RAfilter, reduce as RAreduce } from "fp-ts/ReadonlyArray"
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

export function useConfigureStrainCatalogSearchGraphql({
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
  const graphqlLens = Lens.fromProp<SearchConfigMember>()("graphqlFilter")
  // @ts-ignore
  const basePipe = flow(RAfilter(filterStrainConfig), RNAhead)
  // @ts-ignore
  const dataFieldPipe = pipe(strainConfig(), basePipe, dataFieldLens.get)
  // @ts-ignore
  const graphqlPipe = pipe(strainConfig(), basePipe, graphqlLens.get)
  const filterPipe = pipe(
    fieldsToVariables,
    Rkeys,
    RAfilter((field) => searchParams.has(field)),
    RAreduce({}, (accumulator, field: string) => ({
      ...accumulator,
      // @ts-ignore
      [fieldsToVariables[field]]: searchParams.get(field),
    })),
  )
  return pipe(
    initValues,
    strainCatalogDataFieldLens.set(dataFieldPipe),
    // @ts-ignore
    filterLens.set({ ...graphqlPipe, ...filterPipe }),
  )
}
