import { GeneQuery } from "dicty-graphql-schema"
import mockGeneralInfoPiaA from "mocks/piaAMocks/mockGeneralInfoPiaA"
import mockLinksPiaA from "mocks/piaAMocks/mockLinksPiaA"
import mockOrthologsPiaA from "mocks/piaAMocks/mockOrthologsPiaA"
import mockProductInfoPiaA from "mocks/piaAMocks/mockProductInfoPIaA"
import mockReferencesPiaA from "mocks/piaAMocks/mockReferencesPiaA"
import mockAssociatedAda2 from "./mockAssociatedAda2"
import mockOntologyAda2 from "./mockOntologyAda2"
import mockPhenotypesAda2 from "./mockPhenotypesAda2"

const mockGeneAda2Limit: GeneQuery = {
  gene: {
    __typename: "Gene",
    id: "DDB_G0280079",
    name: "ada2",
    goas: [...mockOntologyAda2.goas],
  },
  allStrains: {
    __typename: "Gene",
    id: "DDB_G0280079",
    name: "ada2",
    strains: [...mockPhenotypesAda2.strains],
  },
  allPublications: {
    num_pubs: 40,
    publications: [...mockReferencesPiaA.slice(0, 3)],
  },
  allOrthologs: {
    __typename: "Gene",
    id: "DDB_G0280079",
    name: "ada2",
    orthologs: [...mockOrthologsPiaA.orthologs],
  },
  listGeneProductInfo: {
    id: "DDB_G0280079",
    name: "ada2",
    product_info: [...mockProductInfoPiaA],
  },
  generalInformation: {
    id: "DDB_G0280079",
    name: "ada2",
    general_info: mockGeneralInfoPiaA,
  },
  getAssociatedSequnces: {
    id: "DDB_G0280079",
    name: "ada2",
    associated_sequences: mockAssociatedAda2,
  },
  getLinks: {
    id: "DDB_G0280079",
    name: "ada2",
    links: mockLinksPiaA,
  },
}
export default mockGeneAda2Limit
