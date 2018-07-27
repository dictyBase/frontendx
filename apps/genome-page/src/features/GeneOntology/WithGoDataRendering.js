import React, { Component } from "react"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"

const WithGoDataRendering = WrappedComponent => {
  class WithGoDataRenderingComponent extends Component {
    render() {
      const { hasErrored, isLoading } = this.props
      if (hasErrored) {
        return (
          <p>
            Sorry! There was an error loading the items: {hasErrored.message}
          </p>
        )
      }

      if (isLoading) {
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
      hasErrored: state.goa.hasErrored,
      isLoading: state.goa.isLoading,
    }
  }

  return connect(
    mapStateToProps,
    null,
  )(WithGoDataRenderingComponent)
}

export default WithGoDataRendering
