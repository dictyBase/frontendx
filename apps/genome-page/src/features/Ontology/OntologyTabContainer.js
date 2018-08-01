import React, { Component } from "react"
import Skeleton from "react-loading-skeleton"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import InnerGoPanel from "./InnerGoPanel"

const TabContainer = props => {
  return (
    <Typography component="div" style={{ paddingTop: 5 }}>
      {props.children}
    </Typography>
  )
}

class OntologyTabContainer extends Component {
  state = {
    value: 0,
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
        code =>
          code.attributes.evidence_code === "IMP" ||
          code.attributes.evidence_code === "IGI" ||
          code.attributes.evidence_code === "IDA",
      )
      const manual = goaData.data.data.filter(
        code =>
          code.attributes.evidence_code === "IMP" ||
          code.attributes.evidence_code === "IGI" ||
          code.attributes.evidence_code === "IDA" ||
          code.attributes.evidence_code === "IBA",
      )
      const electronic = goaData.data.data.filter(
        code => code.attributes.evidence_code === "IEA",
      )

      return (
        <div>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="All GO" />
              <Tab label="Experimental GO" />
              <Tab label="Manual GO" />
              <Tab label="Electronic GO" />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TabContainer>
              <InnerGoPanel goaData={all} />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <InnerGoPanel goaData={experimental} />
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <InnerGoPanel goaData={manual} />
            </TabContainer>
          )}
          {value === 3 && (
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
