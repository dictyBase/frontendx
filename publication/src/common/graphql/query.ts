import gql from "graphql-tag"

const GET_PUBLICATION = gql`
  query Publication($id: ID!) {
    publication(id: $id) {
      id
      doi
      title
      abstract
      journal
      pub_date
      pages
      issue
      volume
      authors {
        initials
        last_name
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

export { GET_PUBLICATION, GET_REFRESH_TOKEN }
