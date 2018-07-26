import React, { Component } from "react"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import * as data from "common/fake-data/goa-only-data.json"

// this is going to need a URL for data fetching
// also a way to determine active tab (pass as props?)
// include tab generator function

const WithGeneTabs = WrappedComponent => {
  class WithGeneTabsComponent extends Component {
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
      hasErrored: state.goData.hasErrored,
      isLoading: state.goData.isLoading,
    }
  }

  return connect(
    mapStateToProps,
    null,
  )(WithGeneTabsComponent)
}

export default WithGeneTabs
