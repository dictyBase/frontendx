import React, { Component } from "react"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import GeneOntologyContainer from "features/GeneOntology/GeneOntologyContainer"
import ProteinInformationContainer from "features/ProteinInformation/ProteinInformationContainer"
import * as data from "common/fake-data/goa-only-data.json"

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

class MainTabs extends Component {
  state = {
    value: "summary",
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  // generates tabs dynamically based on json data structure
  generateTabs = json => {
    const tabs = json.data.attributes.group.map((item, key) => {
      switch (item) {
        case "protein":
          return (
            <Tab
              className={this.props.classes.tab}
              value={item}
              label="Protein Information"
              key={key}
              // component={Link}
              // to={"/protein"}
            />
          )
        case "goa":
          return (
            <Tab
              className={this.props.classes.tab}
              value={item}
              label="Gene Ontology"
              key={key}
              // component={Link}
              // to={"/DDB_G0272608/goa"}
            />
          )
        case "orthologs":
          return (
            <Tab
              className={this.props.classes.tab}
              value={item}
              label="Orthologs"
              key={key}
              // component={Link}
              // to={"/orthologs"}
            />
          )
        case "phenotypes":
          return (
            <Tab
              className={this.props.classes.tab}
              value={item}
              label="Phenotypes"
              key={key}
              // component={Link}
              // to={"/phenotypes"}
            />
          )
        case "references":
          return (
            <Tab
              className={this.props.classes.tab}
              value={item}
              label="References"
              key={key}
              // component={Link}
              // to={"/references"}
            />
          )
        case "blast":
          return (
            <Tab
              className={this.props.classes.tab}
              value={item}
              label="BLAST"
              key={key}
              // component={Link}
              // to={"/blast"}
            />
          )
        default:
          return null
      }
    })
    return tabs
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

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
              to={"/"}
            />
            {this.generateTabs(data)}
          </Tabs>
        </AppBar>
        {value === "summary" && <TabContainer>Gene Summary</TabContainer>}
        {value === "protein" && (
          <TabContainer>
            <ProteinInformationContainer />
          </TabContainer>
        )}
        {value === "goa" && (
          <TabContainer>
            <GeneOntologyContainer />
          </TabContainer>
        )}
        {value === "orthologs" && <TabContainer>Orthologs</TabContainer>}
        {value === "phenotypes" && <TabContainer>Phenotypes</TabContainer>}
        {value === "references" && <TabContainer>Reference</TabContainer>}
        {value === "blast" && <TabContainer>BLAST</TabContainer>}
      </div>
    )
  }
}

export default withStyles(styles)(MainTabs)
