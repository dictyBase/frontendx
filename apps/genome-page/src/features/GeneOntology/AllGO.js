// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchData } from "./goActions"
import DisplayTable from "./DisplayTable"
import WithGoDataRendering from "./WithGoDataRendering"
import { GoHeaderStyle } from "styles/style"

type Props = {
  /** The data fetched from the API */
  goData: Object,
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
    const { data } = this.props.goData
    return (
      <div>
        <GoHeaderStyle>
          <h3>Molecular Function ({data.length})</h3>
        </GoHeaderStyle>
        <DisplayTable data={data} />
        <br />
        <GoHeaderStyle>
          <h3>Biological Process ({data.length})</h3>
        </GoHeaderStyle>
        <DisplayTable data={data} />
        <br />
        <GoHeaderStyle>
          <h3>Cellular Composition ({data.length})</h3>
        </GoHeaderStyle>
        <DisplayTable data={data} />
      </div>
    )
  }
}

const mapStateToProps = ({ goData }) => ({ goData })

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(fetchData(url)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithGoDataRendering(AllGO))
