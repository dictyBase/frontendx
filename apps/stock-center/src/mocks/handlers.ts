import { HttpResponse } from "msw"
import { match } from "ts-pattern"
import {
  StockEntityType,
  StockSearchFieldEnum,
  StrainType,
  PlasmidType,
  mockStrainListQuery,
  mockStrainQuery,
  mockPlasmidQuery,
  mockPlasmidListFilterQuery,
  mockListPhenotypesQuery,
  mockListPhenotypeEnvironmentsQuery,
  mockListPhenotypeAssaysQuery,
  mockPublicationQuery,
  mockAddStrainPhenotypeMutation,
  mockListStockSuggestionsQuery,
  mockSearchStocksQuery,
  mockListStrainsWithPhenotypeQuery,
  mockContentBySlugQuery,
} from "dicty-graphql-schema/dist/mocks"
import {
  availableStrain,
  mockPhenotypes,
  mockPlasmid,
  mockContent,
} from "@dictybase/ui-dsc"
import { EXPECTED_STRAIN, EXPECTED_PLASMID } from "../e2e/utils/expectedData"
import { generateListStrainDataOfLength } from "./listStrainData"
import { generateListPlasmidDataOfLength } from "./listPlasmidData"

const STRAIN_TYPENAME = "Strain" as const
const PLASMID_TYPENAME = "Plasmid" as const
const AXE_STRAIN_LABEL = "pdsA552,axeA,axeB,axeC"

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

const mockUser = {
  __typename: "User" as const,
  id: "1",
  email: "dictybase@northwestern.edu",
  first_name: "Dicty",
  last_name: "Stock Center",
}

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

const mockSmp3Strain = {
  ...availableStrain,
  __typename: STRAIN_TYPENAME,
  id: "DBS0391520",
  label: "[smp3]-",
  summary: "Genome Wide Dictyostelium Insertion bank (GWDI) intergenic mutant",
  in_stock: true,
}

const mockRegularStrain = {
  __typename: STRAIN_TYPENAME,
  id: "DBS0351791",
  label: "tor(1-476:MTRSLRKVEKLKNSEPTLCTK:479-2380)",
  summary: "tor mutant strain",
  in_stock: true,
}

const mockGoldenBraidPlasmid = {
  __typename: PLASMID_TYPENAME,
  id: "DBP0001101",
  name: "pDGB_O2_0006",
  summary: "GoldenBraid plasmid vector",
  in_stock: true,
}

const mockRegularPlasmid = {
  __typename: PLASMID_TYPENAME,
  id: "DBP0001102",
  name: "pUPD2_T2A_TCGGGC_GGCTCG",
  summary: "Regular plasmid vector",
  in_stock: true,
}

const mockStrainListData = [
  {
    __typename: STRAIN_TYPENAME,
    id: mockSmp3Strain.id,
    label: mockSmp3Strain.label,
    summary: mockSmp3Strain.summary,
    in_stock: true,
  },
  ...generateListStrainDataOfLength(28),
]

const mockPlasmidListData = [
  mockGoldenBraidPlasmid,
  ...generateListPlasmidDataOfLength(28),
]

const handlers = [
  mockStrainListQuery(({ variables }) => {
    const { cursor, limit, filter } = variables
    const sourceList = match(filter?.strain_type)
      .with(StrainType.Regular, () => [
        mockRegularStrain,
        ...mockStrainListData,
      ])
      .otherwise(() => mockStrainListData)
    const totalCount = sourceList.length
    const nextCursor = cursor + limit < totalCount ? cursor + limit : 0
    const strains = sourceList.slice(0, cursor + limit)
    return HttpResponse.json({
      data: { listStrains: { strains, nextCursor, totalCount } },
    })
  }),
  mockPlasmidListFilterQuery(({ variables }) => {
    const { cursor, limit, filter } = variables
    const sourceList = match(filter?.plasmid_type)
      .with(PlasmidType.Regular, () => [
        mockRegularPlasmid,
        ...mockPlasmidListData,
      ])
      .otherwise(() => mockPlasmidListData)
    const totalCount = sourceList.length
    const nextCursor = cursor + limit < totalCount ? cursor + limit : 0
    const plasmids = sourceList.slice(0, cursor + limit)
    return HttpResponse.json({
      data: { listPlasmids: { plasmids, nextCursor, totalCount } },
    })
  }),
  mockStrainQuery(({ variables }) => {
    const strain = match(variables.id)
      .with(EXPECTED_STRAIN.id, () => ({
        __typename: STRAIN_TYPENAME,
        ...EXPECTED_STRAIN,
      }))
      .with(mockSmp3Strain.id, () => mockSmp3Strain)
      .otherwise(() => ({
        ...availableStrain,
        id: variables.id,
        phenotypes: mockPhenotypes,
      }))
    return HttpResponse.json({ data: { strain } })
  }),
  mockPlasmidQuery(({ variables }) => {
    const plasmid = match(variables.id)
      .with(EXPECTED_PLASMID.id, () => ({
        __typename: PLASMID_TYPENAME,
        ...EXPECTED_PLASMID,
      }))
      .otherwise(() => ({
        ...mockPlasmid,
        id: variables.id,
        publications: [mockPublication],
      }))
    return HttpResponse.json({ data: { plasmid } })
  }),
  mockListStockSuggestionsQuery(() =>
    HttpResponse.json({
      data: {
        listStockSuggestions: {
          limit: 10,
          totalCount: 1,
          suggestions: [
            {
              __typename: "StockSuggestion",
              id: "DBS0236414",
              entity: StockEntityType.Strain,
              field: StockSearchFieldEnum.Label,
              display_text: AXE_STRAIN_LABEL,
              score: 1,
            },
          ],
        },
      },
    }),
  ),
  mockSearchStocksQuery(() =>
    HttpResponse.json({
      data: {
        searchStocks: {
          limit: 50,
          totalCount: 1,
          results: [
            {
              __typename: "StockSearchResult",
              id: "DBS0236414",
              entity: StockEntityType.Strain,
              field: StockSearchFieldEnum.Label,
              display_text: AXE_STRAIN_LABEL,
              stock_label: AXE_STRAIN_LABEL,
              summary: "axeA, axeB, axeC mutant strain",
              score: 1,
              in_stock: true,
              stock_type: "regular",
            },
          ],
        },
      },
    }),
  ),
  mockListStrainsWithPhenotypeQuery(() =>
    HttpResponse.json({
      data: {
        listStrainsWithAnnotation: {
          totalCount: 1,
          nextCursor: 0,
          strains: [
            {
              __typename: STRAIN_TYPENAME,
              id: "DBS0238720",
              label: "krsA-",
              genes: [{ __typename: "Gene", name: "DDB_G0269364" }],
              publications: [mockPublication],
            },
          ],
        },
      },
    }),
  ),
  mockContentBySlugQuery(({ variables }) =>
    HttpResponse.json({
      data: {
        contentBySlug: {
          __typename: "Content",
          id: "1",
          name: variables.slug,
          slug: variables.slug,
          content: JSON.stringify(mockContent),
          created_at: "2022-01-01T00:00:00.000Z",
          updated_at: "2022-01-01T00:00:00.000Z",
          created_by: mockUser,
          updated_by: mockUser,
        },
      },
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
