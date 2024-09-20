import {
  mockStrainListQuery,
  mockStrainQuery,
  mockListPhenotypesQuery,
  mockListPhenotypeEnvironmentsQuery,
  mockListPhenotypeAssaysQuery,
  mockPublicationQuery,
} from "dicty-graphql-schema/types/mocks"
import { availableStrain, mockPhenotypes } from "@dictybase/ui-dsc"
import { generateListStrainDataOfLength } from "./listStrainData"

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

const mockPublication = {
  id: "2",
  doi: "/publication/31067156",
  title:
    "Force balances between interphase centrosomes, as revealed by laser ablation.",
  abstract: "",
  journal: "Mol. Biol. Cell mbcE19010034",
  pub_date: "",
  pages: "",
  issue: "",
  volume: "",
  authors: [
    { last_name: "Odell" },
    { last_name: "Sikirzhytski" },
    { last_name: "Tikhonenko" },
    { last_name: "Cobani" },
    { last_name: "Khodjakov & Koonce (2019)" },
  ],
}
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
  mockListPhenotypesQuery((_, response, context) =>
    response(
      context.data({
        listPhenotypes: [
          "aberrant cell motility in response to calcium ion",
          "decreased cell migration to prestalk region",
          "abolished endocytic recycling",
        ],
      }),
    ),
  ),
  mockListPhenotypeEnvironmentsQuery((_, response, context) =>
    response(
      context.data({
        listPhenotypeEnvironments: [
          "Environment 1",
          "Environment 2",
          "Environment 3",
        ],
      }),
    ),
  ),
  mockListPhenotypeAssaysQuery((_, response, context) =>
    response(
      context.data({
        listPhenotypeAssays: [
          "western blot",
          "northern blot",
          "confocal microscopy",
        ],
      }),
    ),
  ),
  mockPublicationQuery(async (request, response, context) => {
    await wait(1500)
    if (request.variables.id === mockPublication.id) {
      return response(
        context.data({
          publication: mockPublication,
        }),
      )
    }
    return response(context.status(500))
  }),
]

export { handlers }
