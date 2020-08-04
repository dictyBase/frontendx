import React from "react"
import { Helmet } from "react-helmet"
import { useParams, useRouteMatch } from "react-router-dom"
import { useQuery } from "@apollo/client"
import Typography from "@material-ui/core/Typography"
import PanelWrapper from "common/components/panels/PanelWrapper"
import SummaryLoader from "./SummaryLoader"
import Layout from "app/layout/Layout"
import GoaPanel from "features/Summary/Panels/GoaPanel"
import { GET_GENE_BY_ID, GET_GENE_BY_NAME } from "common/graphql/query"

const SummaryContainer = () => {
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

  if (loading) return <SummaryLoader id={id} />

  if (error) return <div>got an error...</div>

  let geneData = data.geneByID ? data.geneByID : data.geneByName

  return (
    <Layout>
      <Helmet>
        <title>Gene Summary for {geneData.name} - dictyBase</title>
        <meta
          name="description"
          content={`Gene information for ${geneData.name} at dictyBase`}
        />
      </Helmet>
      <Typography component="div">
        <PanelWrapper
          title="Latest Gene Ontology Annotations"
          route={`/${id}/goannotations`}>
          <GoaPanel data={geneData.goas} />
        </PanelWrapper>
      </Typography>
    </Layout>
  )
}

export default SummaryContainer
