import ViteExpress from "vite-express"
import express from "express"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import bodyParser from 'body-parser'
import { generateListStrainDataOfLength } from "./src/mocks/listStrainData.js"

const expressApp = express()

const typeDefs = `#graphql
type Strain {
  id: ID!
  label: String!
  summary: String!
  inStock: Boolean!
}

type StrainListWithCursor {
  strains: [Strain!]!
  nextCursor: Int!
  previousCursor: Int!
  limit: Int
  totalCount: Int!
}

enum StrainType {
  ALL
  REGULAR
  GWDI
  BACTERIAL
}

input StrainListFilter {
  label: String
  summary: String
  id: ID
  inStock: Boolean
  strainType: StrainType!
}

type Query { 
  listStrains(
    cursor: Int
    limit: Int
    filter: StrainListFilter
  ): StrainListWithCursor
}
`
const strainList = generateListStrainDataOfLength(25)

const resolvers = {
  Query: {
    listStrains: (_, variables) => {
      const { cursor, limit, filter } = variables
      const totalCount = strainList.length
      const nextCursor = cursor + limit < totalCount ? cursor + limit : null
      const strains = strainList.slice(0, cursor + limit)
      console.log({ nextCursor, totalCount, strains })
      return {
        strains,
        nextCursor,
        totalCount
      }
    },
  },
}

const graphqlServer = new ApolloServer({ typeDefs, resolvers })

await graphqlServer.start()

expressApp.use('/graphql', cors(), bodyParser.json(), expressMiddleware(graphqlServer))

const server = expressApp.listen(3003, "0.0.0.0", () =>
  // eslint-disable-next-line no-console
  console.log("Server is listening..."),
)

ViteExpress.bind(expressApp, server)
