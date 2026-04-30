import { StrainType, PlasmidType } from "dicty-graphql-schema"

const graphqlListVariables = { cursor: 0, limit: 12 }
const defaultFilter = { param: "group", value: "regular" }
const searchFields = ["descriptor", "summary"]

const DEFAULT_PLASMID_GROUP = { plasmid_type: PlasmidType.Regular }
const DEFAULT_STRAIN_GROUP = { strain_type: StrainType.Regular }

const plasmidGroupFilterOptions = [
  {
    label: "Regular Plasmids",
    value: "regular",
    graphqlFilter: DEFAULT_PLASMID_GROUP,
  },
  {
    label: "Golden Braid Plasmids",
    value: "goldenbraid",
    graphqlFilter: { plasmid_type: PlasmidType.GoldenBraid },
  },
  {
    label: "All Plasmids",
    value: "all",
    graphqlFilter: { plasmid_type: PlasmidType.All },
  },
]

const strainGroupFilterOptions = [
  {
    label: "Regular Strains",
    value: "regular",
    graphqlFilter: DEFAULT_STRAIN_GROUP,
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

export {
  graphqlListVariables,
  searchFields,
  plasmidGroupFilterOptions,
  strainGroupFilterOptions,
  defaultFilter,
  DEFAULT_STRAIN_GROUP,
  DEFAULT_PLASMID_GROUP,
}
