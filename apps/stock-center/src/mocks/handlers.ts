import { mockStrainListQuery } from "dicty-graphql-schema"
import { generateListStrainDataOfLength } from "./listStrainData"

const mockStrainListData = generateListStrainDataOfLength(30)

const handlers = [
  mockStrainListQuery((request, response, context) => {
    const { cursor, limit, filter } = request.variables
    const totalCount = mockStrainListData.length
    const nextCursor = cursor + limit < totalCount ? cursor + limit : 0
    const strains = mockStrainListData.slice(0, cursor + limit)
    return response(
      context.data({
        listStrains: { strains, nextCursor, totalCount },
      }),
    )
  }),
]

export { handlers }
