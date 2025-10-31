import { HttpResponse, passthrough } from "msw"
import { BrowserLevel } from "browser-level"
import {
  mockGeneOntologyAnnotationQuery,
  mockListStrainsWithGeneQuery,
  mockListPublicationsWithGeneQuery,
  mockUpdateGeneGeneralInfoMutation,
  mockCreateGeneGeneralInfoMutation,
  mockGeneGeneralInformationSummaryQuery,
  GeneGeneralInfo,
} from "dicty-graphql-schema/dist/mocks"
import { pipe } from "fp-ts/function"
import {
  map as Rmap,
  filter as Rfilter,
  compact as Rcompact,
} from "fp-ts/Record"
import { mockOntologyData } from "./mockOntologyData"
import { mockOntologyPiaA } from "./piaAMocks/mockOntologyPiaA"
import { mockOntologyAda2 } from "./ada2Mocks/mockOntologyAda2"
import { mockPhenotypesData } from "./mockPhenotypesData"
import { mockPhenotypesPiaA } from "./piaAMocks/mockPhenotypesPiaA"
import { mockPhenotypesAda2 } from "./ada2Mocks/mockPhenotypesAda2"
import { mockReferencesData } from "./mockReferencesData"
import { mockGeneralInfoData } from "./mockGeneralInfoData"
import { mockGeneralInfoPiaA } from "./piaAMocks/mockGeneralInfoPiaA"

// In-memory database for gene general information
const geneGeneralInfoDatabase = new BrowserLevel<string, GeneGeneralInfo>(
  "gene-general-info",
  {
    valueEncoding: "json",
  },
)

// Seed the database with initial mock data
const seedDatabase = async () => {
  try {
    // Check if already seeded
    const keys = await geneGeneralInfoDatabase.keys().all()
    if (keys.length === 0) {
      // Seed sadA
      await geneGeneralInfoDatabase.put(
        mockGeneralInfoData.id,
        mockGeneralInfoData,
      )
      // Seed piaA
      await geneGeneralInfoDatabase.put(
        mockGeneralInfoPiaA.id,
        mockGeneralInfoPiaA,
      )
    }
  } catch (error) {
    console.error("Failed to seed gene general info database:", error)
  }
}

// Seed on initialization
seedDatabase()

const errorMessage = "Internal Server Error"

export const handlers = [
  // Gene General Information Query
  mockGeneGeneralInformationSummaryQuery(async ({ variables }) => {
    const { gene } = variables
    try {
      const geneGeneralInfo = await geneGeneralInfoDatabase.get(gene)
      return HttpResponse.json({
        data: { geneGeneralInformation: geneGeneralInfo },
      })
    } catch {
      // Gene not found in database
      return HttpResponse.json({
        // eslint-disable-next-line unicorn/no-null
        data: { geneGeneralInformation: null },
      })
    }
  }),

  // Create Gene General Information Mutation
  mockCreateGeneGeneralInfoMutation(async ({ variables }) => {
    const { id, input } = variables
    try {
      const existing = await geneGeneralInfoDatabase.get(id)
      if (!existing) {
        throw new Error(`Could not find Gene General Info for ID: ${id}`)
      }

      const updated: GeneGeneralInfo = {
        ...existing,
        ...input,
      }

      console.table({ existing, input, updated })
      await geneGeneralInfoDatabase.put(id, updated)
      const updatedGeneInfo = await geneGeneralInfoDatabase.get(id)
      return HttpResponse.json({
        data: { createGeneGeneralInfo: updatedGeneInfo },
      })
    } catch {
      return HttpResponse.json(
        { errors: [{ message: errorMessage }] },
        { status: 500 },
      )
    }
  }),

  // Update Gene General Information Mutation
  mockUpdateGeneGeneralInfoMutation(async ({ variables }) => {
    const { id, input } = variables
    try {
      const existing = await geneGeneralInfoDatabase.get(id)
      if (!existing) {
        throw new Error(`Could not find Gene General Info for ID: ${id}`)
      }

      const updated: GeneGeneralInfo = {
        ...existing,
        ...input,
      }

      console.table({ existing, input, updated })
      await geneGeneralInfoDatabase.put(id, updated)
      const updatedGeneInfo = await geneGeneralInfoDatabase.get(id)
      return HttpResponse.json({
        data: { updateGeneGeneralInfo: updatedGeneInfo },
      })
    } catch {
      return passthrough()
    }
  }),

  // Existing handlers below
  // Handles the Gene query: https://github.com/dictyBase/dicty-graphql-schema/blob/develop/src/queries/gene.graphql
  // Implementation details here: https://github.com/dictyBase/genomepage/pull/825#issuecomment-977246804
  mockGeneOntologyAnnotationQuery(({ variables }) => {
    const { gene } = variables
    switch (gene) {
      case "sadA":
        return HttpResponse.json({
          data: { geneOntologyAnnotation: mockOntologyData.goas },
        })
      case "piaA":
        return HttpResponse.json({
          data: { geneOntologyAnnotation: mockOntologyPiaA.goas },
        })
      case "ada2":
        return HttpResponse.json({
          data: { geneOntologyAnnotation: mockOntologyAda2.goas },
        })
      default:
        return HttpResponse.json({
          errors: [{ message: `No mock for ${gene}` }],
        })
    }
  }),
  mockListStrainsWithGeneQuery(({ variables }) => {
    const { gene } = variables
    switch (gene) {
      case "sadA":
        return HttpResponse.json({
          data: { listStrainsWithGene: mockPhenotypesData.strains },
        })
      case "piaA":
        return HttpResponse.json({
          data: { listStrainsWithGene: mockPhenotypesPiaA.strains },
        })
      case "ada2":
        return HttpResponse.json({
          data: { listStrainsWithGene: mockPhenotypesAda2.strains },
        })
      default:
        return HttpResponse.json({
          errors: [{ message: `No mock for ${gene}` }],
        })
    }
  }),
  mockListPublicationsWithGeneQuery(({ variables }) => {
    const { gene } = variables
    switch (gene) {
      case "sadA":
      case "piaA":
      case "ada2":
        return HttpResponse.json({
          data: { listPublicationsWithGene: mockReferencesData },
        })
      default:
        return HttpResponse.json({
          errors: [{ message: `No mock for ${gene}` }],
        })
    }
  }),
]
