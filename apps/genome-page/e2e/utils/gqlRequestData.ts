import {
  GeneGeneralInformationSummary,
  GeneOntologyAnnotationSummary,
  ListPublicationsWithGeneSummary,
} from "dicty-graphql-schema/dist/query"

const geneGeneralInformationSummaryQueryData = (gene: string) => ({
  data: {
    operationName: "GeneGeneralInformationSummary",
    query: GeneGeneralInformationSummary.loc?.source.body,
    variables: {
      gene,
    },
  },
})

const geneOntologyAnnotationSummaryQueryData = (gene: string) => ({
  data: {
    operationName: "GeneOntologyAnnotationSummary",
    query: GeneOntologyAnnotationSummary.loc?.source.body,
    variables: {
      gene,
    },
  },
})

const listPublicationsWithGeneSummaryQueryData = (gene: string) => ({
  data: {
    operationName: "ListPublicationsWithGeneSummary",
    query: ListPublicationsWithGeneSummary.loc?.source.body,
    variables: {
      gene,
    },
  },
})

export {
  geneGeneralInformationSummaryQueryData,
  geneOntologyAnnotationSummaryQueryData,
  listPublicationsWithGeneSummaryQueryData,
}
