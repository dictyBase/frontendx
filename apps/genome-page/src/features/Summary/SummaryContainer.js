// @flow
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Grid from "@material-ui/core/Grid"

import PanelWrapper from "common/components/PanelWrapper"
import PageHeader from "common/components/PageHeader"
import TabContainer from "common/components/TabContainer"
import ErrorPage from "common/components/ErrorPage"
import SummaryLoader from "./SummaryLoader"
import { tabLabels } from "common/constants/tabLabels"
import { panelLabels } from "./panelLabels"
import { fetchGeneralData, fetchGeneName, changeTab } from "./summaryActions"
import { fetchGoa } from "features/Ontology/goaActions"

type Props = {
  /** React Router object */
  match: Object,
  /** Action to fetch Summary data */
  fetchGeneralData: Function,
  /** Action to fetch GOA data */
  fetchGoa: Function,
  /** Action to fetch gene name from ID */
  fetchGeneName: Function,
  /** Object for the general slice of state */
  general: Object,
  /** Object for the goa slice of state */
  goa: Object,
  /** Action to change the top level tabs */
  changeTab: Function,
}

export class SummaryContainer extends Component<Props> {
  componentDidMount() {
    const { fetchGeneralData, fetchGoa, fetchGeneName, match } = this.props

    // $FlowFixMe
    const mainUrl = `${process.env.REACT_APP_API_SERVER}/genes/${
      match.params.id
    }`
    // $FlowFixMe
    const goaUrl = `${process.env.REACT_APP_API_SERVER}/genes/${
      match.params.id
    }/goas`
    // $FlowFixMe
    const geneIdConvertUrl = `${
      process.env.REACT_APP_API_SERVER
    }/goa/converter/${match.params.id}`

    fetchGeneralData(mainUrl)
    fetchGeneName(geneIdConvertUrl)
    fetchGoa(goaUrl)
  }

  handleChange = (event: SyntheticEvent<>, value: string) => {
    const { changeTab } = this.props

    changeTab(value)
  }

  // generates tabs dynamically based on json data structure
  generateTabs = (json: Object) => {
    const { match } = this.props
    const tabs = json.data.attributes.group.map(
      (item: string, index: string) => {
        if (!tabLabels[item]) {
          return <div>Error: data not mapped to tab</div>
        }
        if (item === "goa") {
          return (
            <Tab
              value={item}
              label={tabLabels[item]}
              key={index}
              component={Link}
              to={`/${match.params.id}/goannotations`}
            />
          )
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
            {/* $FlowFixMe */}
            <InnerPanel panelData={this.props[item]} />
          </PanelWrapper>
        )
      },
    )
    return panels
  }

  render() {
    const { match, general, goa } = this.props

    if (general.error || goa.error) {
      return <ErrorPage />
    }

    if (general.isFetching || goa.isFetching) {
      return <SummaryLoader />
    }

    return (
      <Grid container justify="center">
        <Grid item lg={12}>
          <PageHeader name={general.geneName} />
          <AppBar position="static">
            <Tabs value={general.currentTab} onChange={this.handleChange}>
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
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ general, goa }) => ({ general, goa })

export default connect(
  mapStateToProps,
  { fetchGeneralData, fetchGoa, fetchGeneName, changeTab },
)(SummaryContainer)
