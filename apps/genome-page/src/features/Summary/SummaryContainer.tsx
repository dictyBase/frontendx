import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import Typography from "@material-ui/core/Typography"
import PanelWrapper from "common/components/panels/PanelWrapper"
import SummaryLoader from "./SummaryLoader"
import Layout from "app/layout/Layout"
import GoaPanel from "features/Summary/Panels/GoaPanel"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import { GET_GENE } from "common/graphql/query"

const SummaryContainer = () => {
  const { gene } = useParams()
  const { loading, error, data } = useQuery(GET_GENE, {
    variables: {
      gene,
    },
  })

  if (loading) return <SummaryLoader gene={gene} />

  if (error) return <GraphQLErrorPage error={error} />

  return (
    <Layout>
      <Helmet>
        <title>Gene Summary for {data.gene.name} - dictyBase</title>
        <meta
          name="description"
          content={`Gene information for ${data.gene.name} at dictyBase`}
        />
      </Helmet>
      <Typography component="div">
        <PanelWrapper
          title="Latest Gene Ontology Annotations"
          route={`/${gene}/goannotations`}>
          <GoaPanel data={data.gene.goas} />
        </PanelWrapper>
      </Typography>
    </Layout>
  )
}

export default SummaryContainer
