import {
  mockStrainListQuery,
  mockStrainQuery,
} from "dicty-graphql-schema/types/mocks"
import { availableStrain, mockPhenotypes } from "@dictybase/ui-dsc"
import { generateListStrainDataOfLength } from "./listStrainData"

const mockStrainListData = generateListStrainDataOfLength(30)

const handlers = [
  mockStrainListQuery((request, response, context) => {
    const { cursor, limit } = request.variables
    const totalCount = mockStrainListData.length
    const nextCursor = cursor + limit < totalCount ? cursor + limit : 0
    const strains = mockStrainListData.slice(0, cursor + limit)
    return response(
      context.data({
        listStrains: { strains, nextCursor, totalCount },
      }),
    )
  }),
  mockStrainQuery((_, response, context) =>
    response(
      context.data({
        strain: { ...availableStrain, phenotypes: mockPhenotypes },
      }),
    ),
  ),
]

export { handlers }
