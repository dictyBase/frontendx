import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles"
import Layout from "components/layout/Layout"
import { Box, Skeleton } from "@mui/material"

const skeletonTheme = createTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#DFE8F6",
        color: "#000",
      },
      indicator: {
        backgroundColor: "#858780",
        height: "3px",
      },
    },
  },
})

type Props = {
  /** Gene name/ID (from routing params) */
  gene: string
}

/**
 * Loading screen for GO page
 */

const OntologyLoader = ({ gene }: Props) => (
  <div data-testid="skeleton-loader">
    <Layout gene={gene}>
      <MuiThemeProvider theme={skeletonTheme}>
        <AppBar position="static">
          <Tabs value={0}>
            <Tab label="All GO" />
            <Tab label="Experimental GO" />
            <Tab label="Manual GO" />
            <Tab label="Electronic GO" />
          </Tabs>
        </AppBar>
      </MuiThemeProvider>
      <Box mt="10px">
        {[...Array(5)].map((i) => (
          <Skeleton key={i} animation="wave" />
        ))}
        <br />
        <br />
        {[...Array(5)].map((i) => (
          <Skeleton key={i} animation="wave" />
        ))}
        <br />
        <br />
        {[...Array(5)].map((i) => (
          <Skeleton key={i} animation="wave" />
        ))}
      </Box>
    </Layout>
  </div>
)

export default OntologyLoader
