import {
  mockGeneOntologyAnnotationQuery,
  mockListStrainsWithGeneQuery,
  mockListPublicationsWithGeneQuery,
} from "dicty-graphql-schema/types/mocks"
import { match } from "ts-pattern"
import { mockOntologyData } from "./mockOntologyData"
import { mockOntologyPiaA } from "./piaAMocks/mockOntologyPiaA"
import { mockOntologyAda2 } from "./ada2Mocks/mockOntologyAda2"
import { mockPhenotypesData } from "./mockPhenotypesData"
import { mockPhenotypesPiaA } from "./piaAMocks/mockPhenotypesPiaA"
import { mockPhenotypesAda2 } from "./ada2Mocks/mockPhenotypesAda2"
import { mockReferencesData } from "./mockReferencesData"
import { mockReferencesPiaA } from "./piaAMocks/mockReferencesPiaA"

export const handlers = [
  // Handles the Gene query: https://github.com/dictyBase/dicty-graphql-schema/blob/develop/src/queries/gene.graphql
  // Implementation details here: https://github.com/dictyBase/genomepage/pull/825#issuecomment-977246804
  mockGeneOntologyAnnotationQuery((request, response, context) => {
    const { gene } = request.variables
    return match(gene)
      .with("sadA", () =>
        response(
          context.data({ geneOntologyAnnotation: mockOntologyData.goas }),
        ),
      )
      .with("piaA", () =>
        response(
          context.data({ geneOntologyAnnotation: mockOntologyPiaA.goas }),
        ),
      )
      .with("ada2", () =>
        response(
          context.data({ geneOntologyAnnotation: mockOntologyAda2.goas }),
        ),
      )
      .otherwise((unmockedGene) =>
        response(context.errors([{ message: `No mock for ${unmockedGene}` }])),
      )
  }),
  mockListStrainsWithGeneQuery((request, response, context) => {
    const { gene } = request.variables
    return match(gene)
      .with("sadA", () =>
        response(
          context.data({ listStrainsWithGene: mockPhenotypesData.strains }),
        ),
      )
      .with("piaA", () =>
        response(
          context.data({ listStrainsWithGene: mockPhenotypesPiaA.strains }),
        ),
      )
      .with("ada2", () =>
        response(
          context.data({ listStrainsWithGene: mockPhenotypesAda2.strains }),
        ),
      )
      .otherwise((unmockedGene) =>
        response(context.errors([{ message: `No mock for ${unmockedGene}` }])),
      )
  }),
  mockListPublicationsWithGeneQuery((request, response, context) => {
    const { gene } = request.variables
    return match(gene)
      .with("sadA", () =>
        response(
          context.data({ listPublicationsWithGene: mockReferencesData }),
        ),
      )
      .with("piaA", () =>
        response(
          context.data({ listPublicationsWithGene: mockReferencesPiaA }),
        ),
      )
      .with("ada2", () =>
        response(
          context.data({ listPublicationsWithGene: mockReferencesPiaA }),
        ),
      )
      .otherwise((unmockedGene) =>
        response(context.errors([{ message: `No mock for ${unmockedGene}` }])),
      )
  }),
]
