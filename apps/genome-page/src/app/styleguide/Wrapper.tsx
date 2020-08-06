import React from "react"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_GRAPHQL_SERVER}/graphql`,
  cache: new InMemoryCache(),
})

/**
 * This is a wrapper component used for all styleguidist documentation.
 */

const Wrapper = ({ children }: any) => (
  <ApolloProvider client={client}>
    <BrowserRouter>{children}</BrowserRouter>
  </ApolloProvider>
)

export default Wrapper
