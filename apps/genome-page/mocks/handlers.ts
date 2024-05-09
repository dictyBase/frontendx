import { graphql } from "msw"
import { mockGeneOntologyAnnotationQuery } from "dicty-graphql-schema"
import { mockGene } from "./mockGene"
import { mockGeneLimit } from "./mockGeneLimit"
import { mockGenePiaA } from "./piaAMocks/mockGenePiaA"
import { mockGenePiaALimit } from "./piaAMocks/mockGenePiaALimit"
import { mockGeneAda2 } from "./ada2Mocks/mockGeneAda2"
import { mockGeneAda2Limit } from "./ada2Mocks/mockGeneAda2Limit"

export const handlers = [
  // Handles the Gene query: https://github.com/dictyBase/dicty-graphql-schema/blob/develop/src/queries/gene.graphql
  // Implementation details here: https://github.com/dictyBase/genomepage/pull/825#issuecomment-977246804
  graphql.query("Gene", (request, response, context) => {
    const gene = request.body?.variables?.gene
    const limit = request.body?.variables?.limit

    if (gene === "sadA") {
      if (limit === 3) {
        return response(context.data({ ...mockGeneLimit }))
      }
      return response(context.data({ ...mockGene }))
    }
    if (gene === "piaA") {
      if (limit === 3) {
        return response(context.data({ ...mockGenePiaALimit }))
      }
      return response(context.data({ ...mockGenePiaA }))
    }
    if (gene === "ada2") {
      if (limit === 3) {
        return response(context.data({ ...mockGeneAda2Limit }))
      }
      return response(context.data({ ...mockGeneAda2 }))
    }
    return response(context.errors([{ message: `No mock for ${gene}` }]))
  }),
]
