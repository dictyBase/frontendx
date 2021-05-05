import { gql } from "@apollo/client"

const GET_GENE = gql`
  query Gene($gene: String!) {
    gene(gene: $gene) {
      id
      name
      goas {
        id
        type
        date
        evidence_code
        go_term
        qualifier
        publication
        assigned_by
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
    }
  }
`

export { GET_GENE }
