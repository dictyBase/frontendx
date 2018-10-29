// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"

import TabContainer from "common/components/TabContainer"
import InnerGoPanel from "features/Ontology/InnerGoPanel"
import { changeTab } from "./goaActions"

// create theme with our inner tab overrides
const muiTheme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#e6f2ff",
        color: "#000",
      },
      indicator: {
        backgroundColor: "#858780",
      },
    },
  },
})

type Props = {
  /** Object representing the "goa" slice of state */
  goa: Object,
  /** Action used to change the current GOA tab selection */
  changeTab: Function,
}

/**
 * This is the tab container component for the Gene Ontology tab.
 * It generates inner tabs for displaying GO data, but it only shows
 * a tab if the data exists.
 */

export class OntologyTabContainer extends Component<Props> {
  handleChange = (event: SyntheticEvent<>, value: string) => {
    const { changeTab } = this.props

    changeTab(value)
  }

  render() {
    const { goa } = this.props

    if (goa.data) {
      // set variables for filtered arrays based on evidence code
      const all = goa.data
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
            <Tabs value={goa.currentTab} onChange={this.handleChange}>
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
          {goa.currentTab === "all" && (
            <TabContainer>
              <InnerGoPanel goaData={all} />
            </TabContainer>
          )}
          {goa.currentTab === "experimental" && (
            <TabContainer>
              <InnerGoPanel goaData={experimental} />
            </TabContainer>
          )}
          {goa.currentTab === "manual" && (
            <TabContainer>
              <InnerGoPanel goaData={manual} />
            </TabContainer>
          )}
          {goa.currentTab === "electronic" && (
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
          <Tabs value={goa.currentTab} />
        </AppBar>
        <SkeletonTheme color="#d1d1d1">
          <Skeleton count={10} />
        </SkeletonTheme>
      </div>
    )
  }
}

const mapStateToProps = ({ goa }) => ({ goa })

export default connect(
  mapStateToProps,
  { changeTab },
)(OntologyTabContainer)
