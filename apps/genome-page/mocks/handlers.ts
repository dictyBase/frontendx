import { HttpResponse } from "msw"
import {
  mockGeneOntologyAnnotationQuery,
  mockListStrainsWithGeneQuery,
  mockListPublicationsWithGeneQuery,
  mockGeneSummaryQuery,
} from "dicty-graphql-schema/types/mocks"
import { mockOntologyData } from "./mockOntologyData"
import { mockOntologyPiaA } from "./piaAMocks/mockOntologyPiaA"
import { mockOntologyAda2 } from "./ada2Mocks/mockOntologyAda2"
import { mockPhenotypesData } from "./mockPhenotypesData"
import { mockPhenotypesPiaA } from "./piaAMocks/mockPhenotypesPiaA"
import { mockPhenotypesAda2 } from "./ada2Mocks/mockPhenotypesAda2"
import { mockReferencesData } from "./mockReferencesData"
import { mockReferencesPiaA } from "./piaAMocks/mockReferencesPiaA"
import { mockGeneralInfoData } from "./mockGeneralInfoData"
import { mockGeneralInfoPiaA } from "./piaAMocks/mockGeneralInfoPiaA"

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
        return HttpResponse.json({
          data: { listPublicationsWithGene: mockReferencesData },
        })
      case "piaA" || "ada2":
        return HttpResponse.json({
          data: { listPublicationsWithGene: mockReferencesPiaA },
        })
      default:
        return HttpResponse.json({
          errors: [{ message: `No mock for ${gene}` }],
        })
    }
  }),

  mockGeneSummaryQuery(({ variables }) => {
    const { gene } = variables
    switch (gene) {
      case "sadA":
        return HttpResponse.json({
          data: {
              geneGeneralInformation: mockGeneralInfoData,
              geneOntologyAnnotation: mockOntologyData.goas,
              listPublicationsWithGene: mockReferencesData,
          },
        })
      case "piaA":
        return HttpResponse.json({
          data: {
              geneGeneralInformation: mockGeneralInfoPiaA,
              geneOntologyAnnotation: mockOntologyPiaA.goas,
              listPublicationsWithGene: mockReferencesPiaA,
          },
        })
      case "ada2":
        return HttpResponse.json({
            data: {
              geneGeneralInformation: mockGeneralInfoPiaA,
              geneOntologyAnnotation: mockOntologyAda2.goas,
              listPublicationsWithGene: mockReferencesPiaA,
            },
        })
      default:
        return HttpResponse.json({
          errors: [{ message: `No mock for ${gene}` }],
        })
    }
  }),
]
