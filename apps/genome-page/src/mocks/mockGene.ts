import { Gene } from "dicty-graphql-schema"
import mockOntologyData from "./mockOntologyData"
import mockPhenotypesData from "./mockPhenotypesData"

const mockGene: { gene: Gene } = {
  gene: {
    __typename: "Gene",
    id: "DDB_G0288511",
    name: "sadA",
    goas: { ...mockOntologyData.goas },
    strains: { ...mockPhenotypesData.strains },
  },
}
export default mockGene
