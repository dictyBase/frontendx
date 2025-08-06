const geneGeneralInformationSummaryQueryData = (gene: string) => ({
  data: {
    operationName: "GeneGeneralInformationSummary",
    query: `query GeneGeneralInformationSummary($gene: String!) {
          geneGeneralInformation(gene: $gene) {
            id
            name_description
            gene_product
            synonyms
            description
          }
        }`,
    variables: {
      gene,
    },
  },
})

const geneOntologyAnnotationSummaryQueryData = (gene: string) => ({
  data: {
    operationName: "GeneOntologyAnnotationSummary",
    query: `query GeneOntologyAnnotationSummary($gene: String!) {
        geneOntologyAnnotation(gene: $gene) {
          id
          type
          date
          go_term
          evidence_code
          with {
            id
            db
            name
          }
        extensions {
            id
            db
            relation
            name
          }
        }
      }`,
    variables: {
      gene,
    },
  },
})

export {
  geneGeneralInformationSummaryQueryData,
  geneOntologyAnnotationSummaryQueryData,
}
