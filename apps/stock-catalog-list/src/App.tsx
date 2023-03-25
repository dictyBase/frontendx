import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import { useGraphqlClient, apolloClientCache } from "@dictybase/data-access"
import StrainCatalog from "./StrainCatalog"
import { listStrainsPagination } from "@dictybase/hook-dsc"

export function App() {
  const client = useGraphqlClient({
    uri: import.meta.env.REACT_APP_GRAPHQL_SERVER as string,
    cache: apolloClientCache({
      customPolicies: {
        Query: {
          fields: {
            listStrains: listStrainsPagination(),
          },
        },
      },
    }),
  })
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Navigate to="/strains" />} />
          <Route path="/strains" element={<StrainCatalog />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  )
}
