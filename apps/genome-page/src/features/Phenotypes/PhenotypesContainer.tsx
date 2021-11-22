import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import Layout from "app/layout/Layout"
import { useGeneQuery } from "dicty-graphql-schema"
import PhenotypesLoader from "./PhenotypesLoader"

const PhenotypesContainer = () => {
  let { gene } = useParams()
  if (!gene) gene = ""
  const { loading, error, data } = useGeneQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
  })

  if (loading) return <PhenotypesLoader gene={gene} />

  if (error) return <GraphQLErrorPage error={error} />

  const geneName = data?.gene?.name as string

  return (
    <Layout gene={geneName}>
      <Helmet>
        <title>Phenotypes for {geneName} - dictyBase</title>
        <meta
          name="description"
          content={`Gene Ontology Annotations for ${geneName} at dictyBase`}
        />
      </Helmet>

      <Typography component="div">
        <h1>Render table here...</h1>
      </Typography>
    </Layout>
  )
}

export default PhenotypesContainer
