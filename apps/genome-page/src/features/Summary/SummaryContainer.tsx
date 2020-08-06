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

/**
 * Container component that issues a GraphQL query to get gene data for the
 * summary page.
 */

const SummaryContainer = () => {
  const { gene } = useParams()
  const { loading, error, data } = useQuery(GET_GENE, {
    variables: {
      gene,
    },
  })

  if (loading) return <SummaryLoader gene={gene} />

  if (error) return <GraphQLErrorPage error={error} />

  const geneName = data.gene.name

  return (
    <Layout gene={geneName}>
      <Helmet>
        <title>Gene Summary for {geneName} - dictyBase</title>
        <meta
          name="description"
          content={`Gene information for ${geneName} at dictyBase`}
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
