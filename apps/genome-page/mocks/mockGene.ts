import { GeneQuery } from "dicty-graphql-schema"
import mockOntologyData from "./mockOntologyData"
import mockOrthologsData from "./mockOrthologsData"
import mockPhenotypesData from "./mockPhenotypesData"
import mockReferencesData from "./mockReferencesData"

const mockGene: GeneQuery = {
  gene: {
    __typename: "Gene",
    id: "DDB_G0288511",
    name: "sadA",
    goas: [...mockOntologyData.goas],
  },
  allStrains: {
    __typename: "Gene",
    id: "DDB_G0288511",
    name: "sadA",
    strains: [...mockPhenotypesData.strains],
  },
  allPublications: [...mockReferencesData],
  allOrthologs: {
    __typename: "Gene",
    id: "DDB_G0288511",
    name: "sadA",
    orthologs: [...mockOrthologsData.orthologs],
  }
}
export default mockGene
