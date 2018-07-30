import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"

import Panel from "common/components/Panel"
import { tabLabels } from "common/constants/tabLabels"
import { panelLabels } from "./panelLabels"
import { fetchGeneralData } from "./summaryActions"

const TabContainer = props => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  )
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: "10px 5px 0px 5px",
  },
  tabs: {
    backgroundColor: "#a3bae9",
    color: "#000",
  },
  tab: {
    textTransform: "none",
  },
})

export class SummaryContainer extends Component {
  state = {
    value: "summary",
  }

  // component will fetch data to determine tabs/panels
  componentDidMount() {
    // set url for fetching data
    const url = `${process.env.REACT_APP_GENE_SERVER}`
    this.props.fetchGeneralData(url)
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  // generates tabs dynamically based on json data structure
  generateTabs = json => {
    const { match, classes } = this.props
    const tabs = json.data.attributes.group.map((item, index) => {
      if (!tabLabels[item]) {
        return <div>Error: data not mapped to tab</div>
      }
      return (
        <Tab
          className={classes.tab}
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
          <Panel key={index} title="Error">
            Error: data not mapped to tab
          </Panel>
        )
      }
      return (
        <Panel key={index} title={panelLabels[item]}>
          test
        </Panel>
      )
    })
    return panels
  }

  render() {
    const { classes, match } = this.props
    const { isFetching, error, data } = this.props.general
    const { value } = this.state

    if (error) {
      return <p>Sorry! There was an error loading the items: {error.message}</p>
    }

    if (isFetching) {
      return (
        <div>
          <Skeleton count={10} />
        </div>
      )
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={this.handleChange}>
            <Tab
              className={classes.tab}
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
  )(withStyles(styles)(SummaryContainer)),
)
