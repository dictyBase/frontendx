// @flow
import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

import PanelWrapper from "common/components/PanelWrapper"
import PageHeader from "common/components/PageHeader"
import { tabLabels } from "common/constants/tabLabels"
import { panelLabels } from "./panelLabels"
import { fetchGeneralData } from "./summaryActions"
import { fetchGoa } from "features/Ontology/goaActions"

type tabContainerProps = {
  children: any,
}

const TabContainer = (props: tabContainerProps) => {
  return <Typography component="div">{props.children}</Typography>
}

type State = {
  /** Value representing each tab */
  value: string,
}

type Props = {
  /** React Router object */
  match: Object,
  /** Action creator to fetch Summary data */
  fetchGeneralData: Function,
  /** Action creator to fetch GOA data */
  fetchGoa: Function,
  /** Object for the general slice of state */
  general: Object,
  /** Object for the goa slice of state */
  goa: Object,
}

export class SummaryContainer extends Component<Props, State> {
  state = {
    value: "summary",
  }

  componentDidMount() {
    const { fetchGeneralData, fetchGoa, match } = this.props

    // $FlowFixMe
    const mainUrl = `${process.env.REACT_APP_API_SERVER}/genes/${
      match.params.id
    }`
    // $FlowFixMe
    const goaUrl = `${process.env.REACT_APP_API_SERVER}/genes/${
      match.params.id
    }/goas`
    fetchGeneralData(mainUrl)
    fetchGoa(goaUrl)
  }

  handleChange = (event: SyntheticEvent<>, value: string) => {
    this.setState({ value })
  }

  // generates tabs dynamically based on json data structure
  generateTabs = (json: Object) => {
    const { match } = this.props
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
            to={`/${match.params.id}/${item}`}
          />
        )
      },
    )
    return tabs
  }

  // generates panels based on json data structure
  generatePanels = (json: Object) => {
    const panels = json.data.attributes.subgroup.map(
      (item: Object, index: string) => {
        if (!panelLabels[item]) {
          return (
            <PanelWrapper key={index} title="Error">
              Error: data not mapped to tab
            </PanelWrapper>
          )
        }

        // set variables for each panel's title and component
        const panelTitle = panelLabels[item].title
        const InnerPanel = panelLabels[item].component

        return (
          <PanelWrapper key={index} title={panelTitle}>
            {/* $FlowFixMe */}
            <InnerPanel panelData={this.props[item]} />
          </PanelWrapper>
        )
      },
    )
    return panels
  }

  render() {
    const { match, general, goa } = this.props
    const { value } = this.state

    console.log(general.data)

    if (general.error) {
      return (
        <div>
          <PageHeader />
          <AppBar position="static">
            <Tabs value={value}>
              <Tab label="Gene Summary" />
            </Tabs>
          </AppBar>
          <center>
            <br />
            <h3>Sorry! There was an error loading the items.</h3>
            <p>{general.error}</p>
            <br />
            <br />
          </center>
        </div>
      )
    }

    if (general.isFetching || goa.isFetching) {
      return (
        <div>
          <PageHeader />
          <AppBar position="static">
            <Tabs value={value}>
              <Tab label="Gene Summary" />
              <Tab label="Gene Ontology" />
            </Tabs>
          </AppBar>
          <SkeletonTheme color="#d1d1d1">
            <Skeleton count={10} />
            {/* <br />
            <br />
            <Skeleton count={10} /> */}
          </SkeletonTheme>
        </div>
      )
    }

    return (
      <Grid container justify="center">
        <Grid item lg={12}>
          <PageHeader />
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab
                value="summary"
                label="Gene Summary"
                component={Link}
                to={`/${match.params.id}`}
              />
              {general.data && this.generateTabs(general.data)}
            </Tabs>
          </AppBar>
          <TabContainer>
            {general.data && this.generatePanels(general.data)}
          </TabContainer>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ general, goa }) => ({ general, goa })

export default withRouter(
  connect(
    mapStateToProps,
    { fetchGeneralData, fetchGoa },
  )(SummaryContainer),
)
