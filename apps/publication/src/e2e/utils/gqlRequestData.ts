import { Publication } from "dicty-graphql-schema/dist/query"

const publicationQueryData = (gene: string) => ({
  data: {
    operationName: "Publication",
    query: Publication.loc?.source.body,
    variables: {
      gene,
    },
  },
})

export { publicationQueryData }
