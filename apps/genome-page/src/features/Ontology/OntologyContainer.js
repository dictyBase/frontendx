// @flow
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

import OntologyTabContainer from "./OntologyTabContainer"
import OntologyLoader from "./OntologyLoader"
import ErrorPage from "common/components/ErrorPage"
import PageHeader from "common/components/PageHeader"
import TypographyWrapper from "common/components/TypographyWrapper"
import { tabLabels } from "common/constants/tabLabels"
import { fetchGeneralData, changeTab } from "features/Summary/summaryActions"

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

/**
 * This is the master container component for the Gene Ontology tab.
 * It generates the list of tabs needed to display, and it fetches the GO
 * data from the QuickGO API.
 */

export class OntologyContainer extends Component<Props> {
  componentDidMount() {
    const { fetchGeneralData, match, identifier } = this.props
    let mainUrl

    if (identifier) {
      mainUrl = `${process.env.REACT_APP_FUNC_SERVER}/genes/${match.params.id}`
    } else {
      mainUrl = `${process.env.REACT_APP_FUNC_SERVER}/genes/name/${
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
            to={`/${id}/${item}`}
          />
        )
      },
    )
    return tabs
  }

  render() {
    const { match, general, goa } = this.props

    if (general.error || goa.error) {
      return <ErrorPage />
    }

    if (general.isFetching || goa.isFetching) {
      return <OntologyLoader />
    }

    return (
      <div>
        {general.data && (
          <PageHeader name={general.data.data.attributes.geneName} />
        )}
        <AppBar position="static">
          <Tabs value="goa" onChange={this.handleChange}>
            <Tab
              value="summary"
              label="Gene Summary"
              component={Link}
              to={`/${match.params.id}`}
            />
            {general.data && this.generateTabs(general.data, match.params.id)}
          </Tabs>
        </AppBar>
        <TypographyWrapper>
          <OntologyTabContainer />
        </TypographyWrapper>
      </div>
    )
  }
}

const mapStateToProps = ({ general, goa }) => ({ general, goa })

export default withRouter(
  connect(
    mapStateToProps,
    { fetchGeneralData, changeTab },
  )(OntologyContainer),
)
