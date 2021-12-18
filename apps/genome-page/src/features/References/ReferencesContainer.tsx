import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import Layout from "app/layout/Layout"
import { Strain, useGeneQuery } from "dicty-graphql-schema"

const ReferencesContainer = () => {
  const gene = useParams().gene as string

  const { loading, error, data } = useGeneQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
  })

  if (loading) return <h1>Loading...</h1>

  if (error || !data?.allStrains) return <GraphQLErrorPage error={error} />

  const strains = data.allStrains?.strains as Strain[]

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
        <h1>Data here...</h1>
      </Typography>
    </Layout>
  )
}

export default ReferencesContainer
