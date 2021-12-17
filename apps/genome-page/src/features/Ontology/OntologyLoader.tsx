import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles"
import Layout from "app/layout/Layout"

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
      <SkeletonTheme baseColor="#d1d1d1">
        <Skeleton count={5} />
        <br />
        <br />
        <Skeleton count={5} />
        <br />
        <br />
        <Skeleton count={5} />
      </SkeletonTheme>
    </Layout>
  </div>
)

export default OntologyLoader
