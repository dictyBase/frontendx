import React, { Component } from "react"
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

  // need to convert the group items into real labels, not just "goa", etc

  generateTabs = json => {
    return json.data.attributes.group.map((item, key) => (
      <Tab
        className={this.props.classes.tab}
        value={item}
        label={item}
        key={key}
      />
    ))
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
            <Tab className={classes.tab} value="summary" label="Gene Summary" />
            {this.generateTabs(data)}
            {/* <Tab className={classes.tab} label="Protein Information" />
            <Tab className={classes.tab} label="Gene Ontology" />
            <Tab className={classes.tab} label="Orthologs" />
            <Tab className={classes.tab} label="Phenotypes" />
            <Tab className={classes.tab} label="Reference" /> */}
            <Tab className={classes.tab} label="BLAST" value="blast" />
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
