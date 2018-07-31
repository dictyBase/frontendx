// @flow
import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import WithGoDataRendering from "./WithGoDataRendering"
// import DisplayTable from "./DisplayTable"
import PanelWrapper from "common/components/PanelWrapper"
import { gene2Goa } from "./goaActions"

type Props = {
  /** The data fetched from the API */
  goa: Object,
  /** Action creator that accepts URL as parameter */
  fetchData: Function,
  /** React Router match object */
  match: Object,
  /** Action creator to initiate fetching GO data */
  gene2Goa: Function,
}

/**
 * Fetches and shares all of the GO data
 */

export class AllGO extends Component<Props> {
  componentDidMount() {
    this.props.gene2Goa(`${this.props.match.params.id}`)
  }
  render() {
    // const { data } = this.props.goa
    return (
      <Grid container>
        <Grid item sm={12} md={12} lg={12} xl={12}>
          <PanelWrapper title="Molecular Function">
            <div>data table coming later</div>
          </PanelWrapper>
          <PanelWrapper title="Biological Process">
            <div>data table coming later</div>
          </PanelWrapper>
          <PanelWrapper title="Cellular Composition">
            <div>data table coming later</div>
          </PanelWrapper>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ goa }) => ({ goa })

export default withRouter(
  connect(
    mapStateToProps,
    { gene2Goa },
  )(WithGoDataRendering(AllGO)),
)
