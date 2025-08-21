import { Strain, StrainList } from "dicty-graphql-schema/dist/query"

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

export { strainQueryData, strainListQueryData }
