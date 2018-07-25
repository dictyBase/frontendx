import React from "react"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import GeneOntologyContainer from "features/GeneOntology/GeneOntologyContainer"
import ProteinInformationContainer from "features/ProteinInformation/ProteinInformationContainer"

function TabContainer(props) {
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
    textTransform: "none",
    backgroundColor: "#4C5E81",
  },
})

class MainTabs extends React.Component {
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
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={this.handleChange}>
            <Tab label="Gene Summary" />
            <Tab label="Protein Information" />
            <Tab label="Gene Ontology" />
            <Tab label="Orthologs" />
            <Tab label="Phenotypes" />
            <Tab label="Reference" />
            <Tab label="BLAST" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Gene Summary</TabContainer>}
        {value === 1 && (
          <TabContainer>
            <ProteinInformationContainer />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <GeneOntologyContainer />
          </TabContainer>
        )}
        {value === 3 && <TabContainer>Orthologs</TabContainer>}
        {value === 4 && <TabContainer>Phenotypes</TabContainer>}
        {value === 5 && <TabContainer>Reference</TabContainer>}
        {value === 6 && <TabContainer>BLAST</TabContainer>}
      </div>
    )
  }
}

export default withStyles(styles)(MainTabs)
