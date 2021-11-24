import { GoAnnotation } from "dicty-graphql-schema"
import mockOntologyData from "./mockOntologyData"
import mockPhenotypesData, { IMockPhenotypesData } from "./mockPhenotypesData"

interface IMockGeneData {
  __typename?: string
  id: string
  name: string
  goas?: GoAnnotation[]
  phenotypes?: IMockPhenotypesData[]
}

const mockGene: { gene: IMockGeneData } = {
  gene: {
    __typename: "Gene",
    id: "DDB_G0288511",
    name: "sadA",
    goas: [...mockOntologyData.goas],
    phenotypes: [...mockPhenotypesData.phenotypes],
  },
}

export type { IMockGeneData }
export default mockGene
