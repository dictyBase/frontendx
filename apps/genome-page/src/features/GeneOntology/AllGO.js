// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import { fetchData } from "./goaActions"
import DisplayTable from "./DisplayTable"
import WithGoDataRendering from "./WithGoDataRendering"
import Panel from "common/components/Panel"

type Props = {
  /** The data fetched from the API */
  goa: Object,
  /** Action creator that accepts URL as parameter */
  fetchData: Function,
}

/**
 * Fetches and shares all of the GO data
 */

export class AllGO extends Component<Props> {
  componentDidMount() {
    this.props.fetchData("https://api.myjson.com/bins/6vbot")
  }
  render() {
    const { data } = this.props.goa
    return (
      <Grid container>
        <Grid item sm={12} md={12} lg={12} xl={12}>
          <Panel title="Molecular Function">
            <DisplayTable data={data} />
          </Panel>
          <Panel title="Biological Process">
            <DisplayTable data={data} />
          </Panel>
          <Panel title="Cellular Composition">
            <DisplayTable data={data} />
          </Panel>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ goa }) => ({ goa })

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(fetchData(url)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithGoDataRendering(AllGO))
