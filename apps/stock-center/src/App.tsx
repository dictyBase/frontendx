import { Fragment } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import { useGraphqlClient, useApolloClientCache } from "@dictybase/data-access"
import { listStrainsPagination } from "@dictybase/hook-dsc"
import { routes } from "./routes"

export const App = () => {
  const client = useGraphqlClient({
    uri: import.meta.env.REACT_APP_GRAPHQL_SERVER as string,
    cache: useApolloClientCache({
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
          {routes.map(({ path, component: Component = Fragment }) => {
            const element = <Component />
            return <Route key={path} path={path} element={element} />
          })}
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  )
}
