import { HttpResponse } from "msw"
import {
  mockStrainListQuery,
  mockStrainQuery,
  mockListPhenotypesQuery,
  mockListPhenotypeEnvironmentsQuery,
  mockListPhenotypeAssaysQuery,
  mockPublicationQuery,
  mockAddStrainPhenotypeMutation,
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
  pub_date: "2011-10-10T14:48:00",
  pages: "",
  issue: "",
  volume: "",
  authors: [
    { last_name: "Odell" },
    { last_name: "Sikirzhytski" },
    { last_name: "Tikhonenko" },
    { last_name: "Cobani" },
    { last_name: "Khodjakov & Koonce" },
  ],
}
const mockStrainListData = generateListStrainDataOfLength(30)

const handlers = [
  mockStrainListQuery(({ variables }) => {
    const { cursor, limit } = variables
    const totalCount = mockStrainListData.length
    const nextCursor = cursor + limit < totalCount ? cursor + limit : 0
    const strains = mockStrainListData.slice(0, cursor + limit)
    return HttpResponse.json({
      data: { listStrains: { strains, nextCursor, totalCount } },
    })
  }),
  mockStrainQuery(() =>
    HttpResponse.json({
      data: { strain: { ...availableStrain, phenotypes: mockPhenotypes } },
    }),
  ),
  mockListPhenotypesQuery(() =>
    HttpResponse.json({
      data: {
        listPhenotypes: [
          "aberrant cell motility in response to calcium ion",
          "decreased cell migration to prestalk region",
          "abolished endocytic recycling",
        ],
      },
    }),
  ),
  mockListPhenotypeEnvironmentsQuery(() =>
    HttpResponse.json({
      data: {
        listPhenotypeEnvironments: [
          "Environment 1",
          "Environment 2",
          "Environment 3",
        ],
      },
    }),
  ),
  mockListPhenotypeAssaysQuery(() =>
    HttpResponse.json({
      data: {
        listPhenotypeAssays: [
          "western blot",
          "northern blot",
          "confocal microscopy",
        ],
      },
    }),
  ),
  mockPublicationQuery(async ({ variables }) => {
    await wait(1500)
    if (variables.id === mockPublication.id) {
      return HttpResponse.json({
        data: { publication: mockPublication },
      })
    }
    return HttpResponse.json(
      { errors: [{ message: "Internal Server Error" }] },
      { status: 500 },
    )
  }),

  mockAddStrainPhenotypeMutation(async ({ variables }) => {
    await wait(1500)
    return HttpResponse.json({
      data: {
        addStrainPhenotype: {
          id: variables.strainId,
          label: "test_strain_label",
          phenotypes: [{ ...variables.input, publication: mockPublication }],
        },
      },
    })
  }),
]

export { handlers }
