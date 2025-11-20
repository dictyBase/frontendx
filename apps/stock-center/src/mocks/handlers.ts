import { HttpResponse } from "msw"
import {
  mockStrainListQuery,
  mockStrainQuery,
  mockPlasmidQuery,
  mockPlasmidListFilterQuery,
  mockListPhenotypesQuery,
  mockListPhenotypeEnvironmentsQuery,
  mockListPhenotypeAssaysQuery,
  mockPublicationQuery,
  mockAddStrainPhenotypeMutation,
} from "dicty-graphql-schema/dist/mocks"
import { availableStrain, mockPhenotypes, mockPlasmid } from "@dictybase/ui-dsc"
import { generateListStrainDataOfLength } from "./listStrainData"
import { generateListPlasmidDataOfLength } from "./listPlasmidData"

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
const mockPlasmidListData = generateListPlasmidDataOfLength(30)

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
  mockPlasmidListFilterQuery(async ({ variables }) => {
    const { cursor, limit } = variables
    const totalCount = mockPlasmidListData.length
    const nextCursor = cursor + limit < totalCount ? cursor + limit : 0
    const plasmids = mockPlasmidListData.slice(0, cursor + limit)
    await wait(2000)
    return HttpResponse.json({
      data: { listPlasmids: { plasmids, nextCursor, totalCount } },
    })
    // return HttpResponse.json({
    //   errors: [
    //     {
    //       message:
    //         "invalid filter parameter: error in generating AQL statement invalid parameters: Key: 'AQLFilterParams.Filters' Error:Field validation for 'Filters' failed on the 'min' tag",
    //       path: ["listPlasmids"],
    //       extensions: {
    //         code: "Internal",
    //         timestamp: "2025-11-18T14:54:12.155503715Z",
    //       },
    //     },
    //     {
    //       message:
    //         "rpc error: code = Internal desc = invalid filter parameter: error in generating AQL statement invalid parameters: Key: 'AQLFilterParams.Filters' Error:Field validation for 'Filters' failed on the 'min' tag",
    //       path: ["listPlasmids"],
    //     },
    //   ],
    //   data: { listPlasmids: null },
    // })
  }),
  mockStrainQuery(() =>
    HttpResponse.json({
      data: { strain: { ...availableStrain, phenotypes: mockPhenotypes } },
    }),
  ),
  mockPlasmidQuery(() =>
    HttpResponse.json({
      data: { plasmid: { ...mockPlasmid, publications: [mockPublication] } },
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
