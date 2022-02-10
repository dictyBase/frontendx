import { GeneQuery } from "dicty-graphql-schema"
import mockOntologyData from "./mockOntologyData"
import mockOrthologsData from "./mockOrthologsData"
import mockPhenotypesData from "./mockPhenotypesData"
import mockReferencesData from "./mockReferencesData"

const mockGeneLimit: GeneQuery = {
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
  allPublications: {
    num_pubs: 14,
    publications: [...mockReferencesData.slice(0,3)]
  },
  allOrthologs: {
    __typename: "Gene",
    id: "DDB_G0288511",
    name: "sadA",
    orthologs: [...mockOrthologsData.orthologs],
  }
}
export default mockGeneLimit
