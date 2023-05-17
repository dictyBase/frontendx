import { StrainListDocument, StrainType } from "dicty-graphql-schema"
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
const strainConfig = (): Array<SearchConfigMember> =>
  [
    {
      label: "Regular Strains",
      value: "regular",
      graphqlFilter: { strainType: StrainType.Regular },
    },
    {
      label: "GWDI Strains",
      value: "gwdi",
      graphqlFilter: { strainType: StrainType.Gwdi },
    },
    {
      label: "All Available Strains",
      value: "all",
      graphqlFilter: { strainType: StrainType.All },
    },
    {
      label: "Bacterial Strains",
      value: "bacterial",
      graphqlFilter: { strainType: StrainType.Bacterial },
    },
  ].map((member) => ({ ...member, ...baseConfig }))

export {
  graphqlQueryVariables,
  strainConfig,
  defaultFilter,
  fieldsToVariables,
  baseConfig,
}
