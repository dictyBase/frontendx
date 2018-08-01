import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"

import OntologyTabContainer from "./OntologyTabContainer"
import { tabLabels } from "common/constants/tabLabels"
import { fetchGeneralData } from "features/Summary/summaryActions"
import { fetchGoa } from "features/Ontology/goaActions"

const TabContainer = props => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  )
}

export class OntologyContainer extends Component {
  state = {
    value: "goa",
  }

  componentDidMount() {
    const { fetchGeneralData, fetchGoa, match } = this.props
    const mainUrl = `${process.env.REACT_APP_API_SERVER}/${match.params.id}`
    const goaUrl = `${process.env.REACT_APP_API_SERVER}/${match.params.id}/goas`
    fetchGeneralData(mainUrl)
    fetchGoa(goaUrl)
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

  render() {
    const { value } = this.state
    const { match, general, goa } = this.props

    if (goa.error) {
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
          <br />
          <Skeleton count={10} />
        </div>
      )
    }

    return (
      <div>
        <AppBar position="static">
          <Tabs value={false} onChange={this.handleChange}>
            <Tab
              value="summary"
              label="Gene Summary"
              component={Link}
              to={`/${match.params.id}`}
            />
            {general.data && this.generateTabs(general.data)}
          </Tabs>
        </AppBar>
        {value === "goa" && (
          <TabContainer>
            <OntologyTabContainer />
          </TabContainer>
        )}
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
