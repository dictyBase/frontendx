import { Gene } from "dicty-graphql-schema"
import mockOntologyData from "./mockOntologyData"
import mockPhenotypesData from "./mockPhenotypesData"

const mockGene: { gene: Gene; allStrains: Gene } = {
  gene: {
    __typename: "Gene",
    id: "DDB_G0288511",
    name: "sadA",
    goas: { ...mockOntologyData.goas },
  },
  allStrains: {
    __typename: "Gene",
    id: "DDB_G0288511",
    name: "sadA",
    strains: { ...mockPhenotypesData.strains },
  },
}
export default mockGene
