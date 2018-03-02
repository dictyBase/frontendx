// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchData } from "./goActions"
import DisplayTable from "./DisplayTable"

type Props = {
    /** The data fetched from the API */
    data: Object,
    /** Check if items could not be loaded */
    hasErrored: boolean,
    /** Check if page is loading */
    isLoading: boolean,
    /** Action creator that accepts URL as parameter */
    fetchData: Function
}

/**
 * Fetches and shares only the Manual GO data (IMP, IGI, IDA, IBA)
 */

class ManualGO extends Component<Props> {
    componentDidMount() {
        this.props.fetchData("https://api.myjson.com/bins/6vbot")
    }

    render() {
        const data = this.props.data.filter(
            code =>
                code.evidence === "IMP" ||
                code.evidence === "IGI" ||
                code.evidence === "IDA" ||
                code.evidence === "IBA"
        )
        return (
            <div className="wrapper">
                <DisplayTable data={data} />
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ManualGO)
