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
      id: {
        name: "DPU_G0068986",
        link: "http://dictybase.org/id/DPU_G0068986",
      },
      species: "Dictyostelium purpureum",
      uniprotkb: { name: "", link: "" },
      gene_product: "",
      source: ["JGI/Baylor Sequencing Project"],
    },
  ],
}

export default mockOrthologsData
