import { graphql } from "msw"
import mockGene from "./mockGene"
import mockGeneLimit from "./mockGeneLimit"
import mockGenePiaA from "./piaAMocks/mockGenePiaA"
import mockGenePiaALimit from "./piaAMocks/mockGenePiaALimit"

export const handlers = [
  // Handles the Gene query: https://github.com/dictyBase/dicty-graphql-schema/blob/develop/src/queries/gene.graphql
  // Implementation details here: https://github.com/dictyBase/genomepage/pull/825#issuecomment-977246804
  graphql.query("Gene", (req, res, ctx) => {
    const gene = req.body?.variables?.gene
    const limit = req.body?.variables?.limit

    if (gene === "sadA") {
      if (limit == 3) {
        return res(ctx.data({ ...mockGeneLimit }))
      }
      return res(ctx.data({ ...mockGene }))
    }
    if (gene === "piaA") {
      if (limit == 3) {
        return res(ctx.data({ ...mockGenePiaALimit }))
      }
      return res(ctx.data({ ...mockGenePiaA }))
    }
  }),
]
