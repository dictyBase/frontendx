import { graphql } from "msw"

export const handlers = [
  // Handles the Gene query: https://github.com/dictyBase/dicty-graphql-schema/blob/develop/src/queries/gene.graphql
  // Implementation details here: https://github.com/dictyBase/genomepage/pull/825#issuecomment-977246804
  graphql.query("Gene", (req, res, ctx) => {
    if (req.variables.gene === "sadA") {
      ctx.data({
        gene: {
          message: "Working....",
        },
      })
    }
  }),
]
