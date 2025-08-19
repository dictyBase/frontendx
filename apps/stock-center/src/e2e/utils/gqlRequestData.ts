import { Strain } from "dicty-graphql-schema/dist/query"

const strainQueryData = (id: string) => ({
  data: {
    operationName: "Strain",
    query: Strain.loc?.source.body,
    variables: {
      id,
    },
  },
})

export { strainQueryData }
