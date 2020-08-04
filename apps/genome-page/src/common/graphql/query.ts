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

const GET_REFRESH_TOKEN = gql`
  query GetRefreshToken($token: String!) {
    getRefreshToken(token: $token) {
      token
      user {
        id
        email
        first_name
        last_name
        roles {
          role
          permissions {
            permission
            resource
          }
        }
      }
      identity {
        provider
      }
    }
  }
`

export { GET_GENE, GET_REFRESH_TOKEN }
