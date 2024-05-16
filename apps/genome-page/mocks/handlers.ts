import { mockGeneOntologyAnnotationQuery } from "dicty-graphql-schema"
import { mockGene } from "./mockGene"
import { mockGenePiaA } from "./piaAMocks/mockGenePiaA"
import { mockGeneAda2 } from "./ada2Mocks/mockGeneAda2"
import { match } from "ts-pattern"

export const handlers = [
  // Handles the Gene query: https://github.com/dictyBase/dicty-graphql-schema/blob/develop/src/queries/gene.graphql
  // Implementation details here: https://github.com/dictyBase/genomepage/pull/825#issuecomment-977246804
  mockGeneOntologyAnnotationQuery((request, response, context) => {
    const { gene } = request.variables
    return match(gene)
      .with("sadA", () => response(context.data({ geneOntologyAnnotation: mockGene.gene.goas })))
      .with("piaA", () => response(context.data({ geneOntologyAnnotation: mockGenePiaA.gene.goas })))
      .with("ada2", () => response(context.data({ geneOntologyAnnotation: mockGeneAda2.gene.goas })))
      .otherwise((unmockedGene) => response(context.errors([{ message: `No mock for ${unmockedGene}` }])))
  }),
]
