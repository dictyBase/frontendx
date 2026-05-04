import { PlasmidListFilterQueryVariables } from "dicty-graphql-schema"
import {
  Strain,
  StrainList,
  PlasmidListFilter,
} from "dicty-graphql-schema/dist/query"

const strainQueryData = (id: string) => ({
  data: {
    operationName: "Strain",
    query: Strain.loc?.source.body,
    variables: {
      id,
    },
  },
})

const strainListQueryData = (
  cursor: number,
  filter: { strain_type: string },
  limit: number = 12,
) => ({
  data: {
    operationName: "StrainList",
    query: StrainList.loc?.source.body,
    variables: {
      cursor,
      filter,
      limit,
    },
  },
})

const plasmidListQueryData = ({
  filter,
  cursor = 0,
  limit = 12,
}: PlasmidListFilterQueryVariables) => ({
  data: {
    operationName: "PlasmidFilterList",
    query: PlasmidListFilter.loc?.source.body,
    variables: {
      cursor,
      filter,
      limit,
    },
  },
})
export { strainQueryData, strainListQueryData, plasmidListQueryData }
