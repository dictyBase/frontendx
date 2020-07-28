import React from "react"
import { Helmet } from "react-helmet"
import { useParams, useRouteMatch } from "react-router-dom"
import { useQuery } from "@apollo/client"
import Typography from "@material-ui/core/Typography"
import OntologyTabLayout from "./OntologyTabLayout"
import OntologyLoader from "./OntologyLoader"
import Layout from "app/layout/Layout"
import { GET_GENE_BY_ID, GET_GENE_BY_NAME } from "common/graphql/query"

const OntologyContainer = () => {
  // detect if route contains a gene ID then update graphql query accordingly
  const match = useRouteMatch("/:id([A-Z]{3}_G[0-9]{4,})")
  const { id } = useParams()

  let query = GET_GENE_BY_ID
  let variables = {
    id,
  } as any

  if (match === null) {
    query = GET_GENE_BY_NAME
    variables = {
      name: id,
    }
  }

  const { loading, error, data } = useQuery(query, {
    variables,
  })

  if (loading) return <OntologyLoader />

  if (error) return <div>got an error...</div>

  let geneData = data.geneByID ? data.geneByID : data.geneByName

  return (
    <Layout>
      <Helmet>
        <title>GO Annotations for {geneData.name} - dictyBase</title>
        <meta
          name="description"
          content={`Gene Ontology Annotations for ${geneData.name} at dictyBase`}
        />
      </Helmet>
      <Typography component="div">
        <OntologyTabLayout data={geneData.goas} />
      </Typography>
    </Layout>
  )
}

export default OntologyContainer
