import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"

import PanelWrapper from "common/components/PanelWrapper"
import { tabLabels } from "common/constants/tabLabels"
import { panelLabels } from "./panelLabels"
import { fetchGeneralData } from "./summaryActions"
import { data as goaData } from "features/Summary/Panels/data"

const TabContainer = props => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  )
}

export class SummaryContainer extends Component {
  state = {
    value: "summary",
  }

  componentDidMount() {
    const { fetchGeneralData, match } = this.props
    const url = `${process.env.REACT_APP_API_SERVER}/${match.params.id}`
    fetchGeneralData(url)
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  // generates tabs dynamically based on json data structure
  generateTabs = json => {
    const { match } = this.props
    const tabs = json.data.attributes.group.map((item, index) => {
      if (!tabLabels[item]) {
        return <div>Error: data not mapped to tab</div>
      }
      return (
        <Tab
          value={item}
          label={tabLabels[item]}
          key={index}
          component={Link}
          to={`/${match.params.id}/${item}`}
        />
      )
    })
    return tabs
  }

  // generates panels based on json data structure
  generatePanels = json => {
    const panels = json.data.attributes.subgroup.map((item, index) => {
      if (!panelLabels[item]) {
        return (
          <PanelWrapper key={index} title="Error">
            Error: data not mapped to tab
          </PanelWrapper>
        )
      }

      // set variables for each panel's title and component
      const panelTitle = panelLabels[item].title
      const InnerPanel = panelLabels[item].component

      return (
        <PanelWrapper key={index} title={panelTitle}>
          <InnerPanel data={goaData} />
        </PanelWrapper>
      )
    })
    return panels
  }

  render() {
    const { match } = this.props
    const { isFetching, error, data } = this.props.general
    const { value } = this.state

    if (error) {
      return (
        <div>
          <br />
          <center>Sorry! There was an error loading the items</center>
        </div>
      )
    }

    if (isFetching) {
      return (
        <div>
          <br />
          <Skeleton count={10} />
        </div>
      )
    }

    return (
      <div>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab
              value="summary"
              label="Gene Summary"
              component={Link}
              to={`/${match.params.id}`}
            />
            {data && this.generateTabs(data)}
          </Tabs>
        </AppBar>
        <TabContainer>{data && this.generatePanels(data)}</TabContainer>
      </div>
    )
  }
}

const mapStateToProps = ({ general }) => ({ general })

export default withRouter(
  connect(
    mapStateToProps,
    { fetchGeneralData },
  )(SummaryContainer),
)
