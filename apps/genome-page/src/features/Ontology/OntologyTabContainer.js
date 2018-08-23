// @flow
import React, { Component } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"

import TabContainer from "common/components/TabContainer"
import InnerGoPanel from "features/Ontology/InnerGoPanel"

// create theme with our standard tab overrides
const muiTheme = createMuiTheme({
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
      },
    },
  },
})

type State = {
  /** Value representing each tab */
  value: string,
}

type Props = {
  /** Object representing the "goa" slice of state */
  goaData: Object,
}

/**
 * This is the tab container component for the Gene Ontology tab.
 * It generates inner tabs for displaying GO data, but it only shows
 * a tab if the data exists.
 */

class OntologyTabContainer extends Component<Props, State> {
  state = {
    value: "all",
  }

  handleChange = (event: SyntheticEvent<>, value: string) => {
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    const { goaData } = this.props
    if (goaData.data) {
      // set variables for filtered arrays based on evidence code
      const all = goaData.data.data[0]
      const experimental = all.filter(
        (code: Object) =>
          code.attributes.evidence_code === "IMP" ||
          code.attributes.evidence_code === "IGI" ||
          code.attributes.evidence_code === "IDA" ||
          code.attributes.evidence_code === "IPI" ||
          code.attributes.evidence_code === "IEP" ||
          code.attributes.evidence_code === "EXP",
      )
      const manual = all.filter(
        (code: Object) => code.attributes.evidence_code !== "IEA",
      )
      const electronic = all.filter(
        (code: Object) => code.attributes.evidence_code === "IEA",
      )

      return (
        <MuiThemeProvider theme={muiTheme}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab value="all" label="All GO" />
              {experimental.length > 0 && (
                <Tab value="experimental" label="Experimental GO" />
              )}
              {manual.length > 0 && <Tab value="manual" label="Manual GO" />}
              {electronic.length > 0 && (
                <Tab value="electronic" label="Electronic GO" />
              )}
            </Tabs>
          </AppBar>
          {value === "all" && (
            <TabContainer>
              <InnerGoPanel goaData={all} />
            </TabContainer>
          )}
          {value === "experimental" && (
            <TabContainer>
              <InnerGoPanel goaData={experimental} />
            </TabContainer>
          )}
          {value === "manual" && (
            <TabContainer>
              <InnerGoPanel goaData={manual} />
            </TabContainer>
          )}
          {value === "electronic" && (
            <TabContainer>
              <InnerGoPanel goaData={electronic} />
            </TabContainer>
          )}
        </MuiThemeProvider>
      )
    }

    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} />
        </AppBar>
        <SkeletonTheme color="#d1d1d1">
          <Skeleton count={10} />
        </SkeletonTheme>
      </div>
    )
  }
}

export default OntologyTabContainer
