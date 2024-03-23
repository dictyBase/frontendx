import { StrainListDocument, StrainType } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import {
  ReadonlyNonEmptyArray,
  map as RNAmap,
} from "fp-ts/ReadonlyNonEmptyArray"
import { SearchConfigMember, BaseConfigMember } from "./types"

const graphqlQueryVariables = { cursor: 0, limit: 12 }
const defaultFilter = { param: "group", value: "regular" }
const fieldsToVariables: Record<string, string> = {
  Descriptor: "label",
  Summary: "summary",
}
const baseConfig: BaseConfigMember = {
  graphqlQuery: StrainListDocument,
  dataField: "listStrains",
}
const strainConfig = (): ReadonlyNonEmptyArray<SearchConfigMember> =>
  pipe(
    [
      {
        label: "Regular Strains",
        value: "regular",
        graphqlFilter: { strain_type: StrainType.Regular },
      },
      {
        label: "GWDI Strains",
        value: "gwdi",
        graphqlFilter: { strain_type: StrainType.Gwdi },
      },
      {
        label: "All Available Strains",
        value: "all",
        graphqlFilter: { strain_type: StrainType.All },
      },
      {
        label: "Bacterial Strains",
        value: "bacterial",
        graphqlFilter: { strain_type: StrainType.Bacterial },
      },
    ],
    RNAmap((member) => ({ ...member, ...baseConfig })),
  )

export {
  graphqlQueryVariables,
  strainConfig,
  defaultFilter,
  fieldsToVariables,
  baseConfig,
}
