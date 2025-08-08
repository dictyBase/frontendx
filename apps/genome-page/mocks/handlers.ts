import { HttpResponse } from "msw"
import {
  mockGeneOntologyAnnotationQuery,
  mockListStrainsWithGeneQuery,
  mockListPublicationsWithGeneQuery,
} from "dicty-graphql-schema/dist/mocks"
import { mockOntologyData } from "./mockOntologyData"
import { mockOntologyPiaA } from "./piaAMocks/mockOntologyPiaA"
import { mockOntologyAda2 } from "./ada2Mocks/mockOntologyAda2"
import { mockPhenotypesData } from "./mockPhenotypesData"
import { mockPhenotypesPiaA } from "./piaAMocks/mockPhenotypesPiaA"
import { mockPhenotypesAda2 } from "./ada2Mocks/mockPhenotypesAda2"
import { mockReferencesData } from "./mockReferencesData"

export const handlers = [
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
