import { StrainType, PlasmidType } from "dicty-graphql-schema"

const graphqlListVariables = { cursor: 0, limit: 12 }
const defaultFilter = { param: "group", value: "regular" }
const searchFields = ["descriptor", "summary"]

const plasmidGroupFilterOptions = [
  {
    label: "Regular",
    value: "regular",
    graphqlFilter: { plasmid_type: PlasmidType.Regular },
  },
  {
    label: "Golden Braid",
    value: "goldenbraid",
    graphqlFilter: { plasmid_type: PlasmidType.GoldenBraid },
  },
]

const strainGroupFilterOptions = [
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
]

const variablesFromStrainParameters: Record<string, string> = {
  Descriptor: "label",
  Summary: "summary",
}

export {
  graphqlListVariables,
  searchFields,
  plasmidGroupFilterOptions,
  strainGroupFilterOptions,
  defaultFilter,
  variablesFromStrainParameters,
}
