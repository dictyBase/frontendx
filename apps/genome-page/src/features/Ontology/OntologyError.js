// @flow
import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import PageHeader from "common/components/PageHeader"

const skeletonTheme = createMuiTheme({
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
    },
  },
})

type Props = {
  /** Gene Summary related error message */
  generalError: string,
  /** GO tab related error message */
  goaError: string,
}

const OntologyError = (props: Props) => {
  const { generalError, goaError } = props

  return (
    <div>
      <PageHeader />
      <AppBar position="static">
        <Tabs value="goa">
          <Tab label="Gene Summary" />
          <Tab label="Gene Ontology" />
        </Tabs>
      </AppBar>
      <MuiThemeProvider theme={skeletonTheme}>
        <AppBar position="static">
          <Tabs value="goa">
            <Tab label="All GO" />
            <Tab label="Experimental GO" />
            <Tab label="Manual GO" />
            <Tab label="Electronic GO" />
          </Tabs>
        </AppBar>
      </MuiThemeProvider>
      <center>
        <br />
        <h3>Sorry! There was an error loading the items.</h3>
        <p>{generalError || goaError}</p>
        <br />
        <br />
      </center>
    </div>
  )
}

export default OntologyError
