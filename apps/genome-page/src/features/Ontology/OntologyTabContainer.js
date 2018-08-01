import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import AllGO from "./AllGO"
import ExperimentalGO from "./ExperimentalGO"
import ManualGO from "./ManualGO"
import ElectronicGO from "./ElectronicGO"

const TabContainer = props => {
  return (
    <Typography component="div" style={{ paddingTop: 5 }}>
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
})

class GeneOntologyContainer extends Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="All GO" />
            <Tab label="Experimental GO" />
            <Tab label="Manual GO" />
            <Tab label="Electronic GO" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <AllGO />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <ExperimentalGO />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <ManualGO />
          </TabContainer>
        )}
        {value === 3 && (
          <TabContainer>
            <ElectronicGO />
          </TabContainer>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(GeneOntologyContainer)
