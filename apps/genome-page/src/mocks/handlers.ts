import { HttpResponse } from "msw"
import { match } from "ts-pattern"
import {
  mockGeneGeneralInformationSummaryQuery,
  mockGeneOntologyAnnotationSummaryQuery,
  mockListPublicationsWithGeneSummaryQuery,
  mockGeneOntologyAnnotationQuery,
  mockListStrainsWithGeneQuery,
  mockListPublicationsWithGeneQuery,
} from "dicty-graphql-schema/dist/mocks"
import {
  EXPECTED_GENERAL_INFO,
  EXPECTED_NUM_A_GOAS,
  EXPECTED_PHG1A_REFERENCE,
  EXPECTED_COR_A_STRAINS,
  EXPECTED_NUM_A_REFERENCES,
} from "../e2e/utils/expectedData"
import { mockGeneralInfoData } from "./mockGeneralInfoData"
import { mockGeneralInfoPiaA } from "./piaAMocks/mockGeneralInfoPiaA"
import { mockOntologyData, mockCorAOntologyData } from "./mockOntologyData"
import { mockOntologyPiaA } from "./piaAMocks/mockOntologyPiaA"
import { mockOntologyAda2 } from "./ada2Mocks/mockOntologyAda2"
import { mockPhenotypesData } from "./mockPhenotypesData"
import { mockPhenotypesPiaA } from "./piaAMocks/mockPhenotypesPiaA"
import { mockPhenotypesAda2 } from "./ada2Mocks/mockPhenotypesAda2"
import { mockReferencesData } from "./mockReferencesData"

const NUM_A_GENE_ID = "DDB_G0269114"
const COR_A_GENE_ID = "DDB_G0267382"
const SAD_A_GENE = "sadA"
const PIA_A_GENE = "piaA"
const ADA_2_GENE = "ada2"

const handlers = [
  mockGeneGeneralInformationSummaryQuery(({ variables }) => {
    const geneGeneralInformation = match(variables.gene)
      .with(NUM_A_GENE_ID, () => EXPECTED_GENERAL_INFO)
      .with(SAD_A_GENE, () => mockGeneralInfoData)
      .with(PIA_A_GENE, () => mockGeneralInfoPiaA)
      .otherwise((gene) => ({ ...mockGeneralInfoData, id: gene }))
    return HttpResponse.json({
      data: { geneGeneralInformation },
    })
  }),
  mockGeneOntologyAnnotationSummaryQuery(({ variables }) => {
    const geneOntologyAnnotation = match(variables.gene)
      .with(NUM_A_GENE_ID, () => EXPECTED_NUM_A_GOAS)
      .with(COR_A_GENE_ID, () => mockCorAOntologyData)
      .with(SAD_A_GENE, () => mockOntologyData.goas)
      .with(PIA_A_GENE, () => mockOntologyPiaA.goas)
      .with(ADA_2_GENE, () => mockOntologyAda2.goas)
      .otherwise(() => mockOntologyData.goas)
    return HttpResponse.json({
      data: { geneOntologyAnnotation },
    })
  }),
  mockListPublicationsWithGeneSummaryQuery(({ variables }) => {
    const listPublicationsWithGene = match(variables.gene)
      .with(NUM_A_GENE_ID, () => EXPECTED_NUM_A_REFERENCES)
      .otherwise(() => mockReferencesData)
    return HttpResponse.json({
      data: { listPublicationsWithGene },
    })
  }),
  mockGeneOntologyAnnotationQuery(({ variables }) => {
    const response = match(variables.gene)
      .with(COR_A_GENE_ID, () => ({
        data: { geneOntologyAnnotation: mockCorAOntologyData },
      }))
      .with(NUM_A_GENE_ID, () => ({
        data: { geneOntologyAnnotation: EXPECTED_NUM_A_GOAS },
      }))
      .with(SAD_A_GENE, () => ({
        data: { geneOntologyAnnotation: mockOntologyData.goas },
      }))
      .with(PIA_A_GENE, () => ({
        data: { geneOntologyAnnotation: mockOntologyPiaA.goas },
      }))
      .with(ADA_2_GENE, () => ({
        data: { geneOntologyAnnotation: mockOntologyAda2.goas },
      }))
      .otherwise((gene) => ({
        errors: [{ message: `No mock for ${gene}` }],
      }))
    return HttpResponse.json(response)
  }),
  mockListStrainsWithGeneQuery(({ variables }) => {
    const response = match(variables.gene)
      .with(COR_A_GENE_ID, () => ({
        data: { listStrainsWithGene: EXPECTED_COR_A_STRAINS },
      }))
      .with(SAD_A_GENE, () => ({
        data: { listStrainsWithGene: mockPhenotypesData.strains },
      }))
      .with(PIA_A_GENE, () => ({
        data: { listStrainsWithGene: mockPhenotypesPiaA.strains },
      }))
      .with(ADA_2_GENE, () => ({
        data: { listStrainsWithGene: mockPhenotypesAda2.strains },
      }))
      .otherwise((gene) => ({
        errors: [{ message: `No mock for ${gene}` }],
      }))
    return HttpResponse.json(response)
  }),
  mockListPublicationsWithGeneQuery(({ variables }) => {
    const response = match(variables.gene)
      .with(NUM_A_GENE_ID, () => ({
        data: { listPublicationsWithGene: EXPECTED_NUM_A_REFERENCES },
      }))
      .with("phg1A", () => ({
        data: { listPublicationsWithGene: [EXPECTED_PHG1A_REFERENCE] },
      }))
      .with(SAD_A_GENE, PIA_A_GENE, ADA_2_GENE, () => ({
        data: { listPublicationsWithGene: mockReferencesData },
      }))
      .otherwise((gene) => ({
        errors: [{ message: `No mock for ${gene}` }],
      }))
    return HttpResponse.json(response)
  }),
]

export { handlers }
