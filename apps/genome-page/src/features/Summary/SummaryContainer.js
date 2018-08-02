// @flow
import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"

import PanelWrapper from "common/components/PanelWrapper"
import PageHeader from "common/components/PageHeader"
import { tabLabels } from "common/constants/tabLabels"
import { panelLabels } from "./panelLabels"
import { fetchGeneralData } from "./summaryActions"
import { fetchGoa } from "features/Ontology/goaActions"

type tabContainerProps = {
  children: any,
}

const TabContainer = (props: tabContainerProps) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  )
}

type Props = {
  /** React Router object */
  match: Object,
  /** Action creator to fetch Summary data */
  fetchGeneralData: Function,
  /** Action creator to fetch GOA data */
  fetchGoa: Function,
  /** Object for the general slice of state */
  general: Object,
  /** Object for the goa slice of state */
  goa: Object,
}

export class SummaryContainer extends Component<Props> {
  state = {
    value: "summary",
  }

  componentDidMount() {
    const { fetchGeneralData, fetchGoa, match } = this.props
    const mainUrl = `${process.env.REACT_APP_API_SERVER}/genes/${
      match.params.id
    }`
    const goaUrl = `${process.env.REACT_APP_API_SERVER}/genes/${
      match.params.id
    }/goas`
    fetchGeneralData(mainUrl)
    fetchGoa(goaUrl)
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  // generates tabs dynamically based on json data structure
  generateTabs = (json: Object) => {
    const { match } = this.props
    const tabs = json.data.attributes.group.map(
      (item: Object, index: string) => {
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
      },
    )
    return tabs
  }

  // generates panels based on json data structure
  generatePanels = (json: Object) => {
    const panels = json.data.attributes.subgroup.map(
      (item: Object, index: string) => {
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
            <InnerPanel panelData={this.props[item]} />
          </PanelWrapper>
        )
      },
    )
    return panels
  }

  render() {
    const { match, general, goa } = this.props
    const { value } = this.state

    if (general.error) {
      return (
        <div>
          <br />
          <center>Sorry! There was an error loading the items</center>
        </div>
      )
    }

    if (general.isFetching || goa.isFetching) {
      return (
        <div>
          <PageHeader />
          <AppBar position="static">
            <Tabs value="goa" onChange={this.handleChange} />
          </AppBar>
          <br />
          <Skeleton count={10} />
        </div>
      )
    }

    return (
      <div>
        <PageHeader />
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab
              value="summary"
              label="Gene Summary"
              component={Link}
              to={`/${match.params.id}`}
            />
            {general.data && this.generateTabs(general.data)}
          </Tabs>
        </AppBar>
        <TabContainer>
          {general.data && this.generatePanels(general.data)}
        </TabContainer>
      </div>
    )
  }
}

const mapStateToProps = ({ general, goa }) => ({ general, goa })

export default withRouter(
  connect(
    mapStateToProps,
    { fetchGeneralData, fetchGoa },
  )(SummaryContainer),
)
