import { GoAnnotation } from "dicty-graphql-schema"
import mockOntologyData from "./mockOntologyData"
import mockPhenotypesData, { IMockPhenotypesData } from "./mockPhenotypesData"

interface IMockGeneData {
  id: string
  name: string
  goas: GoAnnotation[]
  phenotypes: IMockPhenotypesData[]
}

const mockGene: { gene: IMockGeneData } = {
  gene: {
    id: "DDB_G0288511",
    name: "sadA",
    goas: [...mockOntologyData.goas],
    phenotypes: [...mockPhenotypesData.phenotypes],
  },
}

export default mockGene
