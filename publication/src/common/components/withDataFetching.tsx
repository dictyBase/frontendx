import React, { Component } from "react"
import { connect } from "react-redux"

type Props = {
  error: Object
  isFetching: Boolean
  action: Function
}

/**
 * HOC used to handle data fetching, loading and error displays.
 */

const withDataFetching = (
  action: Function,
  key: string,
  LoadingComponent: React.FC,
  ErrorComponent: React.FC,
) => (WrappedComponent: React.FC) => {
  class WithDataFetchingComponent extends Component<Props> {
    componentDidMount() {
      const { action } = this.props
      action()
    }

    render() {
      const { error, isFetching } = this.props
      if (error) {
        if (ErrorComponent) {
          return <ErrorComponent />
        }

        return (
          <div style={{ textAlign: "center" }}>
            <br />
            <p>
              <strong>Sorry! There was an error loading the items:</strong>
            </p>
            <p>
              <em>{error.toString()}</em>
            </p>
          </div>
        )
      }

      if (isFetching) {
        if (LoadingComponent) {
          return <LoadingComponent />
        }

        return (
          <div style={{ textAlign: "center" }}>
            <br />
            Loading ...
          </div>
        )
      }

      return <WrappedComponent {...this.props} />
    }
  }
  const mapStateToProps = state => ({
    error: (state as any)[key].error,
    isFetching: (state as any)[key].isFetching,
    data: (state as any)[key].data,
  })

  return connect(
    mapStateToProps,
    { action },
  )(WithDataFetchingComponent)
}

export default withDataFetching
