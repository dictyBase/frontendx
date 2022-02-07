import { Orthologs } from "dicty-graphql-schema"

interface IMockOrthologsData {
  orthologs: Orthologs[]
}
/**
 * Reference: http://dictybase.org/gene/DDB_G0288511/phenotypes
 */
const mockOrthologsData: IMockOrthologsData = {
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
    },
    {
      id: "ENSP00000349959",
      species: "Homo sapiens",
      uniprotkb: "Q6R327-1",
      gene_product: "Rapamycin-insensitive companion of mTOR",
      source: [
        "InParanoid",
        "FOR VISUAL TESTING REMOVE LATER"
      ]
    },
  ],
}

export default mockOrthologsData
