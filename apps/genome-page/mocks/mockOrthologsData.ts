import { Orthologs } from "dicty-graphql-schema"

/**
 * Reference: http://dictybase.org/gene/DDB_G0288511/phenotypes
 */
const mockPhenotypesData: { orthologs: Orthologs } = {
  orthologs: [
    {
      id: "DPU_G0068986",
      species: "Dictyostelium purpureum",
      uniprotkb: "FOR VISUAL TESTING REMOVE LATER",
      gene_product: "FOR VISUAL TESTING REMOVE LATER",
      source: [
        "JGI/Baylor Sequencing Project",
        "FOR VISUAL TESTING REMOVE LATER"
      ]
    } as Orthologs,
  ],
}

export default mockPhenotypesData
