import { StrainType, PlasmidType } from "dicty-graphql-schema"
import { NonEmptyArray } from "fp-ts/NonEmptyArray"

const graphqlListVariables = { cursor: 0, limit: 12 }
const defaultFilter = { param: "group", value: "regular" }
const searchFields = ["descriptor", "summary"]

const DEFAULT_PLASMID_GROUP = { plasmid_type: PlasmidType.Regular }
const DEFAULT_STRAIN_GROUP = { strain_type: StrainType.Regular }

type PlasmidFilterOptions = NonEmptyArray<{
  label: string
  value: string
  graphqlFilter: { plasmid_type: PlasmidType }
}>

type StrainFilterOptions = NonEmptyArray<{
  label: string
  value: string
  graphqlFilter: { strain_type: StrainType }
}>

const plasmidGroupFilterOptions: PlasmidFilterOptions = [
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

const strainGroupFilterOptions: StrainFilterOptions = [
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
    label: "Bacterial Strains",
    value: "bacterial",
    graphqlFilter: { strain_type: StrainType.Bacterial },
  },
  {
    label: "All Strains",
    value: "all",
    graphqlFilter: { strain_type: StrainType.All },
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
