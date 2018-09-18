// @flow
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

import OntologyTabContainer from "./OntologyTabContainer"
import OntologyLoader from "./OntologyLoader"
import OntologyError from "./OntologyError"
import PageHeader from "common/components/PageHeader"
import TabContainer from "common/components/TabContainer"
import { tabLabels } from "common/constants/tabLabels"
import { fetchGeneralData } from "features/Summary/summaryActions"
import { fetchGoa } from "features/Ontology/goaActions"

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

    // $FlowFixMe
    const mainUrl = `${process.env.REACT_APP_API_SERVER}/genes/${
      match.params.id
    }`
    // $FlowFixMe
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
      return <OntologyError generalError={general.error} goaError={goa.error} />
    }

    if (general.isFetching || goa.isFetching) {
      return <OntologyLoader />
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
          <OntologyTabContainer />
        </TabContainer>
      </div>
    )
  }
}

const mapStateToProps = ({ general, goa }) => ({ general, goa })

export default connect(
  mapStateToProps,
  { fetchGeneralData, fetchGoa },
)(OntologyContainer)
