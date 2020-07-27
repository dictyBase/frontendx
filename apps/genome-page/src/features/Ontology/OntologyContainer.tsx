import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import TypographyWrapper from "common/components/TypographyWrapper"
import ErrorPage from "common/components/ErrorPage"
import OntologyTabContainer from "./OntologyTabContainer"
import OntologyLoader from "./OntologyLoader"
import Layout from "app/layout/Layout"
import { GET_GENE_BY_ID } from "common/graphql/query"

type Props = {
  /** Determines if URL ID params match stock ID regex */
  identifier?: boolean
}

/**
 * TODO:
 *
 * 1. Add detection for gene name or gene ID
 */

const OntologyContainer = ({ identifier }: Props) => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_GENE_BY_ID, {
    variables: {
      id,
    },
  })

  if (loading) return <OntologyLoader />

  if (error) return <ErrorPage />

  return (
    <Layout>
      <TypographyWrapper>
        <OntologyTabContainer data={data.geneByID.goas} />
      </TypographyWrapper>
    </Layout>
  )
}

export default OntologyContainer
