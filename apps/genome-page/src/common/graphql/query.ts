import { gql } from "@apollo/client"

const GET_GENE_BY_ID = gql`
  query GeneByID($id: ID!) {
    geneByID(id: $id) {
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

const GET_GENE_BY_NAME = gql`
  query GeneByName($name: String!) {
    geneByName(name: $name) {
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

export { GET_GENE_BY_ID, GET_GENE_BY_NAME, GET_REFRESH_TOKEN }
