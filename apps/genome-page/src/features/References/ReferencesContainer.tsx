import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import Layout from "components/layout/Layout"
import { useGeneQuery } from "dicty-graphql-schema"
import ReferencesLoader from "./ReferencesLoader"

const ReferencesContainer = () => {
  const gene = useParams().gene as string
  const { loading, error, data } = useGeneQuery({
    variables: {
      gene,
    },
  })

  return (
    <Layout gene={gene}>
      <Helmet>
        <title>References for {gene} - dictyBase</title>
        <meta
          name="description"
          content={`Gene references for ${gene} at dictyBase`}
        />
      </Helmet>

      <Typography component="div">
        {loading && <ReferencesLoader />}
        {error && <GraphQLErrorPage error={error} />}
        {data && <p>Data...</p>}
      </Typography>
    </Layout>
  )
}

export default ReferencesContainer
