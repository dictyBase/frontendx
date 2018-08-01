// @flow
import React, { Component } from "react"
import Skeleton from "react-loading-skeleton"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import InnerGoPanel from "./InnerGoPanel"

type tabContainerProps = {
  children: any,
}

const TabContainer = (props: tabContainerProps) => {
  return (
    <Typography component="div" style={{ paddingTop: 5 }}>
      {props.children}
    </Typography>
  )
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

class OntologyTabContainer extends Component<Props> {
  state = {
    value: "all",
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    const { goaData } = this.props

    if (goaData.data) {
      // set variables for filtered arrays based on evidence code
      const all = goaData.data.data
      const experimental = goaData.data.data.filter(
        (code: Object) =>
          code.attributes.evidence_code === "IMP" ||
          code.attributes.evidence_code === "IGI" ||
          code.attributes.evidence_code === "IDA",
      )
      const manual = goaData.data.data.filter(
        (code: Object) =>
          code.attributes.evidence_code === "IMP" ||
          code.attributes.evidence_code === "IGI" ||
          code.attributes.evidence_code === "IDA" ||
          code.attributes.evidence_code === "IBA",
      )
      const electronic = goaData.data.data.filter(
        (code: Object) => code.attributes.evidence_code === "IEA",
      )

      return (
        <div>
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
        </div>
      )
    }

    return (
      <div>
        <AppBar position="static">
          <Tabs value="0" onChange={this.handleChange} />
        </AppBar>
        <br />
        <Skeleton count={10} />
      </div>
    )
  }
}

export default OntologyTabContainer
