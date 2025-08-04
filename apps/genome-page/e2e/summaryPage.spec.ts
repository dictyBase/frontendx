import { test, expect } from "@playwright/test"

test("Renders Gene General Information", async ({ request }) => {
  const geneGeneralInformation = await request.post(
    "https://graphql.dictybase.dev/graphql",
    {
      data: {
        operationName: "GeneGeneralInformationSummary",
        query: `query GeneGeneralInformationSummary($gene: String!) {
          geneGeneralInformation(gene: $gene) {
            id
            name_description
            gene_product
            synonyms
            description
          }
        }`,
        variables: {
          gene: "DDB_G0267382",
        },
      },
    },
  )
  expect(geneGeneralInformation.ok()).toBeTruthy()
  expect(await geneGeneralInformation.json()).toEqual(
    expect.objectContaining({
      data: {
        geneGeneralInformation: {
          id: "DDB_G0267382",
          gene_product: "coronin",
          name_description: ["corA = CORonin"],
          synonyms: [],
          description:
            "actin binding protein regulating actin nucleation, involved in cytokinesis and cell motility",
        },
      },
    }),
  )
})

test("Renders Gene General Information", ({ page }) => {})
