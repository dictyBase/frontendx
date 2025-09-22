import { Publication } from "dicty-graphql-schema/dist/query"

const publicationQueryData = (id: string) => ({
  data: {
    operationName: "Publication",
    query: Publication.loc?.source.body,
    variables: {
      id,
    },
  },
})

export { publicationQueryData }
