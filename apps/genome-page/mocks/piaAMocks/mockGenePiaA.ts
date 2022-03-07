import { GeneQuery } from "dicty-graphql-schema"
import mockLinksPiaA from "./mockLinksPiaA"
import mockAssociatedPiaA from "./mockAssociatedPiaA"
import mockGeneralInfoPiaA from "./mockGeneralInfoPiaA"
import mockProductInfoPiaA from "./mockProductInfoPIaA"
import mockOntologyPiaA from "./mockOntologyPiaA"
import mockOrthologsPiaA from "./mockOrthologsPiaA"
import mockReferencesPiaA from "./mockReferencesPiaA"
import mockPhenotypesPiaA from "./mockPhenotypesPiaA"

const mockGenePiaA: GeneQuery = {
  gene: {
    __typename: "Gene",
    id: "DDB_G0277399",
    name: "piaA",
    goas: [...mockOntologyPiaA.goas],
  },
  allStrains: {
    __typename: "Gene",
    id: "DDB_G0277399",
    name: "piaA",
    strains: [...mockPhenotypesPiaA.strains],
  },
  allPublications: {
    num_pubs: 40,
    publications: [...mockReferencesPiaA],
  },
  allOrthologs: {
    __typename: "Gene",
    id: "DDB_G0277399",
    name: "piaA",
    orthologs: [...mockOrthologsPiaA.orthologs],
  },
  listGeneProductInfo: {
    id: "DDB_G0277399",
    name: "piaA",
    product_info: [...mockProductInfoPiaA],
  },
  generalInformation: {
    id: "DDB_G0277399",
    name: "piaA",
    general_info: mockGeneralInfoPiaA,
  },
  getAssociatedSequnces: {
    id: "DDB_G0277399",
    name: "piaA",
    associated_sequences: mockAssociatedPiaA,
  },
  getLinks: {
    id: "DDB_G0277399",
    name: "piaA",
    links: mockLinksPiaA,
  },
}
export default mockGenePiaA
