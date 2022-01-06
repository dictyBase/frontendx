import { Gene, PublicationWithGene } from "dicty-graphql-schema"
import mockOntologyData from "./mockOntologyData"
import mockPhenotypesData from "./mockPhenotypesData"
import mockReferencesData from "./mockReferencesData"

const mockGene: {
  gene: Gene
  allStrains: Gene
  allPublications: PublicationWithGene[]
} = {
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
}
export default mockGene