import React from "react"
import { Helmet } from "react-helmet"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import LegacyLinkSnackbar from "common/components/LegacyLinkSnackbar"
import PanelWrapper from "common/components/panels/PanelWrapper"
import PageHeader from "common/components/PageHeader"
import TypographyWrapper from "common/components/TypographyWrapper"
import ErrorPage from "common/components/ErrorPage"
import SummaryLoader from "./SummaryLoader"
import GoaPanel from "features/Summary/Panels/GoaPanel"
import { GET_GENE_BY_ID } from "common/graphql/query"

/**
 * TODO:
 *
 * 1. Add panel and tab generation logic
 * 2. Add detection for gene name or gene ID
 */

const SummaryContainer = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_GENE_BY_ID, {
    variables: {
      id,
    },
  })

  if (loading) return <SummaryLoader />

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
          <Tabs value="summary" onChange={handleChange}>
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
          <PanelWrapper
            title="Latest Gene Ontology Annotations"
            route={`/${id}/goannotations`}>
            <GoaPanel data={data.geneByID.goas} />
          </PanelWrapper>
        </TypographyWrapper>
      </Grid>
    </Grid>
  )
}

export default SummaryContainer
