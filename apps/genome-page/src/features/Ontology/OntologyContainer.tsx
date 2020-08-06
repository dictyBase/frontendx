import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import Typography from "@material-ui/core/Typography"
import OntologyTabLayout from "./OntologyTabLayout"
import OntologyLoader from "./OntologyLoader"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import Layout from "app/layout/Layout"
import { GET_GENE } from "common/graphql/query"

const OntologyContainer = () => {
  const { gene } = useParams()
  const { loading, error, data } = useQuery(GET_GENE, {
    variables: {
      gene,
    },
  })

  if (loading) return <OntologyLoader gene={gene} />

  if (error) return <GraphQLErrorPage error={error} />

  const geneName = data.gene.name

  return (
    <Layout gene={geneName}>
      <Helmet>
        <title>GO Annotations for {geneName} - dictyBase</title>
        <meta
          name="description"
          content={`Gene Ontology Annotations for ${geneName} at dictyBase`}
        />
      </Helmet>
      <Typography component="div">
        <OntologyTabLayout data={data.gene.goas} />
      </Typography>
    </Layout>
  )
}

export default OntologyContainer
