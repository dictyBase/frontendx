import { GeneQuery } from "dicty-graphql-schema"
import { mockOntologyData } from "./mockOntologyData"
import { mockOrthologsData } from "./mockOrthologsData"
import { mockPhenotypesData } from "./mockPhenotypesData"
import { mockReferencesData } from "./mockReferencesData"
import { mockProductInfo } from "./mockProductInfo"
import { mockGeneralInfoData } from "./mockGeneralInfoData"
import { mockAssociatedData } from "./mockAssociatedData"
import { mockLinksData } from "./mockLinksData"
import { mockProteinInformation } from "./mockProteinInformation"

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
  allPublications: {
    num_pubs: 14,
    publications: [...mockReferencesData],
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
    product_info: [...mockProductInfo],
  },
  generalInformation: {
    id: "DDB_G0288511",
    name: "sadA",
    general_info: mockGeneralInfoData,
  },
  getAssociatedSequnces: {
    id: "DDB_G0288511",
    name: "sadA",
    associated_sequences: mockAssociatedData,
  },
  getLinks: {
    id: "DDB_G0288511",
    name: "sadA",
    links: mockLinksData,
  },
  getProteinInformation: {
    id: "DDB_G0288511",
    name: "sadA",
    protein_information: mockProteinInformation,
  },
}
export { mockGene }
