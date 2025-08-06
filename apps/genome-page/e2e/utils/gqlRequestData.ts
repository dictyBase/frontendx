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

const listPublicationsWithGeneSummaryQueryData = (gene: string) => ({
  data: {
    operationName: "ListPublicationsWithGeneSummary",
    query: `query ListPublicationsWithGeneSummary($gene: String!) {
        listPublicationsWithGene(gene: $gene) {
          id
          title
          journal
          pages
          issue
          authors {
            last_name
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
  listPublicationsWithGeneSummaryQueryData,
}
