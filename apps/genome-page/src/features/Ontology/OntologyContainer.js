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
    const url = `${process.env.REACT_APP_ONTOLOGY_SERVER}`
    this.props.fetchGeneralData(url)
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
    // const { value } = this.state
    const { match, data, isFetching, error } = this.props

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
          <Tabs value={false} onChange={this.handleChange}>
            <Tab
              value="summary"
              label="Gene Summary"
              component={Link}
              to={`/${match.params.id}`}
            />
            {data && this.generateTabs(data)}
          </Tabs>
        </AppBar>
        <TabContainer>
          <OntologyTabContainer />
        </TabContainer>
      </div>
    )
  }
}

const mapStateToProps = ({ general }) => ({ general })

export default withRouter(
  connect(
    mapStateToProps,
    { fetchGeneralData },
  )(OntologyContainer),
)
