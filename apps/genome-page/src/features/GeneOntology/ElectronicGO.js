import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from './goActions'
import DisplayTable from './DisplayTable'

class ElectronicGO extends Component {
    componentDidMount() {
        this.props.fetchData('https://api.myjson.com/bins/6vbot')
    }

    render() {
        const data = this.props.data.filter(code => code.evidence === 'IEA')
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

export default connect(mapStateToProps, mapDispatchToProps)(ElectronicGO)
