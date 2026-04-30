import {
  StrainListDocument,
  StrainType,
  PlasmidType,
} from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import {
  ReadonlyNonEmptyArray,
  map as RNAmap,
} from "fp-ts/ReadonlyNonEmptyArray"
import { SearchConfigMember, BaseConfigMember } from "./types"

const graphqlListVariables = { cursor: 0, limit: 12 }

const defaultFilter = { param: "group", value: "regular" }

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

const searchFields = ["descriptor", "summary"]
const variablesFromStrainParameters: Record<string, string> = {
  Descriptor: "label",
  Summary: "summary",
}

const baseConfig: BaseConfigMember = {
  graphqlQuery: StrainListDocument,
  dataField: "listStrains",
}
const strainGroupFilterEntries: ReadonlyNonEmptyArray<SearchConfigMember> =
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
  graphqlListVariables,
  searchFields,
  plasmidGroupFilterOptions,
  strainGroupFilterOptions,
  strainGroupFilterEntries,
  defaultFilter,
  variablesFromStrainParameters,
  baseConfig,
}
