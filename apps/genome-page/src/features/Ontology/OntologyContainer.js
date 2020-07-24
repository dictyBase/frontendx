import React from "react"
import { Helmet } from "react-helmet"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import LegacyLinkSnackbar from "common/components/LegacyLinkSnackbar"
import PageHeader from "common/components/PageHeader"
import TypographyWrapper from "common/components/TypographyWrapper"
import ErrorPage from "common/components/ErrorPage"
import OntologyTabContainer from "./OntologyTabContainer"
import OntologyLoader from "./OntologyLoader"
import { GET_GENE_BY_ID } from "common/graphql/query"

/**
 * TODO:
 *
 * 1. Add detection for gene name or gene ID
 */

const OntologyContainer = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_GENE_BY_ID, {
    variables: {
      id,
    },
  })

  if (loading) return <OntologyLoader />

  if (error) return <ErrorPage />

  const handleChange = (event, value) => {
    console.log(value)
  }

  return (
    <Grid container justify="center">
      <Helmet>
        <title>Gene Information for {id} - dictyBase</title>
        <meta
          name="description"
          content={`Gene information for ${id} at dictyBase`}
        />
      </Helmet>
      <Grid item xs={12}>
        <PageHeader name={data.geneByID.name} />
        <LegacyLinkSnackbar id={id} />
        <AppBar position="static">
          <Tabs value="ontology" onChange={handleChange}>
            <Tab
              value="summary"
              label="Gene Summary"
              component={Link}
              to={`/${id}`}
            />
            <Tab
              value="ontology"
              label="Gene Ontology"
              component={Link}
              to={`/${id}/goannotations`}
            />
          </Tabs>
        </AppBar>
        <TypographyWrapper>
          <OntologyTabContainer data={data.geneByID.goas} />
        </TypographyWrapper>
      </Grid>
    </Grid>
  )
}

export default OntologyContainer
