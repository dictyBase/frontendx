// @flow
import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"

import OntologyTabContainer from "./OntologyTabContainer"
import PageHeader from "common/components/PageHeader"
import TabContainer from "common/components/TabContainer"
import { tabLabels } from "common/constants/tabLabels"
import { fetchGeneralData } from "features/Summary/summaryActions"
import { fetchGoa } from "features/Ontology/goaActions"

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

/**
 * This is the master container component for the Gene Ontology tab.
 * It generates the list of tabs needed to display, and it fetches the GO
 * data from the QuickGO API.
 */

export class OntologyContainer extends Component<Props> {
  componentDidMount() {
    const { fetchGeneralData, fetchGoa, match } = this.props

    // if (!process.env.REACT_APP_API_SERVER)
    //   throw new Error("process.env.REACT_APP_API_SERVER required")

    const mainUrl = `${process.env.REACT_APP_API_SERVER}/genes/${
      match.params.id
    }`
    const goaUrl = `${process.env.REACT_APP_API_SERVER}/genes/${
      match.params.id
    }/goas`
    fetchGeneralData(mainUrl)
    fetchGoa(goaUrl)
  }

  // generates tabs dynamically based on json data structure
  generateTabs = (json: Object) => {
    const { match } = this.props

    if (!json.data) {
      return <div>Sorry! There was an error loading the items</div>
    }

    const tabs = json.data.attributes.group.map(
      (item: string, index: string) => {
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

  render() {
    const { match, general, goa } = this.props

    if (general.error || goa.error) {
      return (
        <div>
          <AppBar position="static">
            <Tabs value="goa" />
          </AppBar>
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
            <Tabs>
              <Tab label="Gene Summary" />
              <Tab label="Gene Ontology" />
            </Tabs>
          </AppBar>
          <MuiThemeProvider theme={skeletonTheme}>
            <AppBar position="static">
              <Tabs>
                <Tab label="All GO" />
                <Tab label="Experimental GO" />
                <Tab label="Manual GO" />
                <Tab label="Electronic GO" />
              </Tabs>
            </AppBar>
          </MuiThemeProvider>
          <Skeleton count={5} />
          <br />
          <br />
          <Skeleton count={5} />
          <br />
          <br />
          <Skeleton count={5} />
        </div>
      )
    }

    return (
      <div>
        <PageHeader />
        <AppBar position="static">
          <Tabs value="goa">
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
          <OntologyTabContainer goaData={goa} />
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
  )(OntologyContainer),
)
