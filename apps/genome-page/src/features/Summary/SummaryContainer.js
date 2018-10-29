// @flow
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Grid from "@material-ui/core/Grid"

import PanelWrapper from "common/components/panels/PanelWrapper"
import PageHeader from "common/components/PageHeader"
import TabContainer from "common/components/TabContainer"
import ErrorPage from "common/components/ErrorPage"
import SummaryLoader from "./SummaryLoader"
import { tabLabels } from "common/constants/tabLabels"
import { panelLabels } from "./panelLabels"
import { fetchGeneralData, changeTab } from "./summaryActions"

type Props = {
  /** React Router object */
  match: Object,
  /** Action to fetch Summary data */
  fetchGeneralData: Function,
  /** Object for the general slice of state */
  general: Object,
  /** Object for the goa slice of state */
  goa: Object,
  /** Action to change the top level tabs */
  changeTab: Function,
  /** Boolean set to true if route matches ID */
  identifier: Boolean,
}

export class SummaryContainer extends Component<Props> {
  componentDidMount() {
    const { fetchGeneralData, match, identifier } = this.props

    let mainUrl

    if (identifier) {
      mainUrl = `${process.env.REACT_APP_API_SERVER}/genes/${match.params.id}`
    } else {
      mainUrl = `${process.env.REACT_APP_API_SERVER}/genes/name/${
        match.params.id
      }`
    }

    fetchGeneralData(mainUrl)
  }

  handleChange = (event: SyntheticEvent<>, value: string) => {
    const { changeTab } = this.props

    changeTab(value)
  }

  // generates tabs dynamically based on json data structure
  generateTabs = (json: { data: { attributes: Object } }, id: string) => {
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
              to={`/${id}/goannotations`}
            />
          )
        }
        return (
          <Tab
            value={item}
            label={tabLabels[item]}
            key={index}
            component={Link}
            to={`/${id}/${item}`}
          />
        )
      },
    )
    return tabs
  }

  // generates panels based on json data structure
  generatePanels = (json: Object, id: string) => {
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
        const panelRoute = panelLabels[item].route

        return (
          <PanelWrapper
            key={index}
            title={panelTitle}
            route={`/${id}/${panelRoute}`}>
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
          {general.data && (
            <PageHeader name={general.data.data.attributes.geneName} />
          )}
          <AppBar position="static">
            <Tabs value={general.currentTab} onChange={this.handleChange}>
              <Tab
                value="summary"
                label="Gene Summary"
                component={Link}
                to={`/${match.params.id}`}
              />
              {general.data && this.generateTabs(general.data, match.params.id)}
            </Tabs>
          </AppBar>
          <TabContainer>
            {general.data &&
              goa.data &&
              this.generatePanels(general.data, match.params.id)}
          </TabContainer>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ general, goa }) => ({ general, goa })

export default withRouter(
  connect(
    mapStateToProps,
    { fetchGeneralData, changeTab },
  )(SummaryContainer),
)
