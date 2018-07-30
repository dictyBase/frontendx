import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
// import { connect } from "react-redux"
// import Skeleton from "react-loading-skeleton"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import GeneSummaryContainer from "features/GeneSummary/GeneSummaryContainer"
import GeneOntologyTabContainer from "features/GeneOntology/GeneOntologyTabContainer"
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

export class GeneOntologyMaster extends Component {
  state = {
    value: "goa",
  }

  // set url for fetching data
  // const url = ""

  // component will fetch data to determine tabs/panels
  // componentDidMount() {
  // fetch(url)
  // .then(res => res.json())
  // .then(json => this.setState({ loading: false, data: json }))
  // .catch(err => this.setState({ loading: false, error: err }))
  // }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  // generates tabs dynamically based on json data structure
  generateTabs = json => {
    const tabs = json.data.attributes.group.map((item, key) => {
      const { match, classes } = this.props

      switch (item) {
        case "protein":
          return (
            <Tab
              className={classes.tab}
              value={item}
              label="Protein Information"
              key={key}
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
              key={key}
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
              key={key}
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
              key={key}
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
              key={key}
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
              key={key}
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

  render() {
    const { classes, match } = this.props
    const { value } = this.state

    // const { error, loading } = this.state
    //   if (error) {
    //     return (
    //       <p>
    //         Sorry! There was an error loading the items: {hasErrored.message}
    //       </p>
    //     )
    //   }

    //   if (loading) {
    //     return (
    //       <div>
    //         <Skeleton count={10} />
    //       </div>
    //     )
    //   }

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
            <GeneSummaryContainer />
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

// const mapStateToProps = state => {
//   return {
//     goa: state.goa
//   }
// }

// export default withRouter(connect(mapStateToProps)(withStyles(styles)(GeneOntologyMaster)))
export default withRouter(withStyles(styles)(GeneOntologyMaster))
