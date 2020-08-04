import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import Typography from "@material-ui/core/Typography"
import OntologyTabLayout from "./OntologyTabLayout"
import OntologyLoader from "./OntologyLoader"
import Layout from "app/layout/Layout"
import { GET_GENE } from "common/graphql/query"

const OntologyContainer = () => {
  const { gene } = useParams()
  const { loading, error, data } = useQuery(GET_GENE, {
    variables: {
      gene,
    },
  })

  if (loading) return <OntologyLoader />

  if (error) return <div>got an error...</div>

  return (
    <Layout>
      <Helmet>
        <title>GO Annotations for {data.gene.name} - dictyBase</title>
        <meta
          name="description"
          content={`Gene Ontology Annotations for ${data.gene.name} at dictyBase`}
        />
      </Helmet>
      <Typography component="div">
        <OntologyTabLayout data={data.gene.goas} />
      </Typography>
    </Layout>
  )
}

export default OntologyContainer
