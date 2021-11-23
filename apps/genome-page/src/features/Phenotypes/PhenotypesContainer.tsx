import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import Layout from "app/layout/Layout"
import { useGeneQuery } from "dicty-graphql-schema"
import PhenotypesLoader from "./PhenotypesLoader"
import PhenotypesDataTable from "./PhenotypesDataTable"
import mockPhenotypesData from "../../common/mocks/mockPhenotypesData"

const PhenotypesContainer = () => {
  let { gene } = useParams()
  if (!gene) gene = ""
  const { loading, error, data } = mockPhenotypesData

  if (loading) return <PhenotypesLoader gene={gene} />

  if (error) return <GraphQLErrorPage error={error} />

  const geneName = gene as string

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
        <PhenotypesDataTable data={data.genes} />
      </Typography>
    </Layout>
  )
}

export default PhenotypesContainer
