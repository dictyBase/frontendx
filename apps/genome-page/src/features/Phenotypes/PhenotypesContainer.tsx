import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import Layout from "app/layout/Layout"
import { Strain, useGeneQuery } from "dicty-graphql-schema"
import PhenotypesLoader from "./PhenotypesLoader"
import PhenotypesDataTable from "./PhenotypesDataTable"

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

  if (error || !data?.allStrains) return <GraphQLErrorPage error={error} />

  const geneName = gene as string
  const strains = data.allStrains?.strains as Strain[]

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
        <PhenotypesDataTable data={strains} />
      </Typography>
    </Layout>
  )
}

export default PhenotypesContainer
