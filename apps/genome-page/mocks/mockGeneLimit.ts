import { GeneQuery } from "dicty-graphql-schema"
import mockOntologyData from "./mockOntologyData"
import mockOrthologsData from "./mockOrthologsData"
import mockPhenotypesData from "./mockPhenotypesData"
import mockReferencesData from "./mockReferencesData"
import mockProductInfo from "./mockProductInfo"
import mockGeneralInfoData from "./mockGeneralInfoData"

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
  },
  listGeneProductInfo: {
    id: "DDB_G0288511",
    name: "sadA",
    product_info: [...mockProductInfo]
  },
  generalInformation: {
    id: "DDB_G0288511",
    name: "sadA",
    general_info: mockGeneralInfoData
  }
}
export default mockGeneLimit
