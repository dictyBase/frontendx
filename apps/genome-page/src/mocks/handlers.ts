import { graphql } from "msw"
import mockGene from "./mockGene"

export const handlers = [
  // Handles the Gene query: https://github.com/dictyBase/dicty-graphql-schema/blob/develop/src/queries/gene.graphql
  // Implementation details here: https://github.com/dictyBase/genomepage/pull/825#issuecomment-977246804
  graphql.query("Gene", (req, res, ctx) => {
    const gene = req.body?.variables?.gene
    if (gene === "sadA") {
      return res(
        ctx.data({
          gene: { ...mockGene.gene },
        }),
      )
    }
  }),
]
