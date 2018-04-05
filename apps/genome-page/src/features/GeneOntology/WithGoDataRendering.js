import React, { Component } from "react"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import { fetchData } from "features/GeneOntology/goActions"

const WithGoDataRendering = WrappedComponent => {
  class WithGoDataRenderingComponent extends Component {
    componentDidMount() {
      this.props.fetchData("https://api.myjson.com/bins/6vbot")
    }
    render() {
      if (this.props.hasErrored) {
        return (
          <p>
            Sorry! There was an error loading the items:{" "}
            {this.props.hasErrored.message}
          </p>
        )
      }

      if (this.props.isLoading) {
        return (
          <div>
            <Skeleton count={10} />
          </div>
        )
      }

      return <WrappedComponent {...this.props} />
    }
  }
  const mapStateToProps = state => {
    return {
      data: state.data,
      hasErrored: state.dataHasErrored,
      isLoading: state.dataIsLoading
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      fetchData: url => dispatch(fetchData(url))
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(
    WithGoDataRenderingComponent
  )
}

export default WithGoDataRendering
