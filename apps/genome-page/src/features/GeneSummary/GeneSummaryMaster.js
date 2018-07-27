import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import GeneSummaryContainer from "features/GeneSummary/GeneSummaryContainer"
import GeneOntologyTabContainer from "features/GeneOntology/GeneOntologyTabContainer"
import ProteinInformationContainer from "features/ProteinInformation/ProteinInformationContainer"
import Panel from "common/components/Panel"
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

class GeneSummaryMaster extends Component {
  state = {
    value: "summary",
  }

  // component will fetch data to determine tabs/panels
  // componentDidMount() {
  //   this.props.fetchData("url")
  // }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  // generates tabs dynamically based on json data structure
  generateTabs = json => {
    const tabs = json.data.attributes.group.map((item, index) => {
      const { match, classes } = this.props

      switch (item) {
        case "protein":
          return (
            <Tab
              className={classes.tab}
              value={item}
              label="Protein Information"
              key={index}
              component={Link}
              to={`/${match.params.id}/protein`}
            />
          )
        case "goa":
          return (
            <Tab
              className={classes.tab}
              value={item}
              label="Gene Ontology"
              key={index}
              component={Link}
              to={`/${match.params.id}/goa`}
            />
          )
        case "orthologs":
          return (
            <Tab
              className={classes.tab}
              value={item}
              label="Orthologs"
              key={index}
              component={Link}
              to={`/${match.params.id}/orthologs`}
            />
          )
        case "phenotypes":
          return (
            <Tab
              className={classes.tab}
              value={item}
              label="Phenotypes"
              key={index}
              component={Link}
              to={`/${match.params.id}/phenotypes`}
            />
          )
        case "references":
          return (
            <Tab
              className={classes.tab}
              value={item}
              label="References"
              key={index}
              component={Link}
              to={`/${match.params.id}/references`}
            />
          )
        case "blast":
          return (
            <Tab
              className={classes.tab}
              value={item}
              label="BLAST"
              key={index}
              component={Link}
              to={`/${match.params.id}/blast`}
            />
          )
        // clean up with error modal (needs to be implemented)
        default:
          return <div>Error: data not mapped to tab</div>
      }
    })
    return tabs
  }

  // generates panels based on json data structure
  generatePanels = json => {
    const panels = json.data.attributes.subgroup.map((item, index) => {
      switch (item) {
        case "general":
          return (
            <Panel key={index} title="General Information">
              test
            </Panel>
          )
        case "genomic":
          return (
            <Panel key={index} title="Genomic Information">
              test
            </Panel>
          )
        case "protein":
          return (
            <Panel key={index} title="Gene Product Information">
              test
            </Panel>
          )
        case "goa":
          return (
            <Panel key={index} title="Gene Ontology Annotations">
              test
            </Panel>
          )
        case "dbxrefs":
          return (
            <Panel key={index} title="Links">
              test
            </Panel>
          )
        case "summary":
          return (
            <Panel key={index} title="Summary">
              test
            </Panel>
          )
        case "publication":
          return (
            <Panel key={index} title="Latest References">
              test
            </Panel>
          )
        // clean up with error modal (needs to be implemented)
        default:
          return <div>Error: data not mapped to tab</div>
      }
    })
    return panels
  }

  render() {
    const { classes, match } = this.props
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
              to={`/${match.params.id}`}
            />
            {this.generateTabs(data)}
          </Tabs>
        </AppBar>
        {value === "summary" && (
          <TabContainer>
            <GeneSummaryContainer panels={this.generatePanels(data)} />
          </TabContainer>
        )}
        {value === "protein" && (
          <TabContainer>
            <ProteinInformationContainer />
          </TabContainer>
        )}
        {value === "goa" && (
          <TabContainer>
            <GeneOntologyTabContainer />
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

export default withRouter(withStyles(styles)(GeneSummaryMaster))
