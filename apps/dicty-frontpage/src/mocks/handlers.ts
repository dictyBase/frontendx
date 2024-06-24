import { mockListContentByNamespaceQuery } from "dicty-graphql-schema/types/mocks"
import { generateMockNews } from "./generateMockNews"

const handlers = [
  mockListContentByNamespaceQuery((_, response, context) => {
    const mockNews = generateMockNews(15)
    return response(context.data({ listContentByNamespace: mockNews }))
  }),
]

export { handlers }
