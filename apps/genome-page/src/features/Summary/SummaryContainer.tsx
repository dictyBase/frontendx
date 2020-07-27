import React from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import Typography from "@material-ui/core/Typography"
import PanelWrapper from "common/components/panels/PanelWrapper"
import ErrorPage from "common/components/ErrorPage"
import SummaryLoader from "./SummaryLoader"
import Layout from "app/layout/Layout"
import GoaPanel from "features/Summary/Panels/GoaPanel"
import { GET_GENE_BY_ID } from "common/graphql/query"

type Props = {
  /** Determines if URL ID params match stock ID regex */
  identifier?: boolean
}

/**
 * TODO:
 *
 * 1. Add panel and tab generation logic
 * 2. Add detection for gene name or gene ID
 */

const SummaryContainer = ({ identifier }: Props) => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_GENE_BY_ID, {
    variables: {
      id,
    },
  })

  if (loading) return <SummaryLoader />

  if (error) return <ErrorPage />

  return (
    <Layout>
      <Helmet>
        <title>Gene Summary for {id} - dictyBase</title>
        <meta
          name="description"
          content={`Gene information for ${id} at dictyBase`}
        />
      </Helmet>
      <Typography component="div">
        <PanelWrapper
          title="Latest Gene Ontology Annotations"
          route={`/${id}/goannotations`}>
          <GoaPanel data={data.geneByID.goas} />
        </PanelWrapper>
      </Typography>
    </Layout>
  )
}

export default SummaryContainer
