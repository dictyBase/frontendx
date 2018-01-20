import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from './goActions'
import DisplayTable from './DisplayTable'

class AllGO extends Component {
    componentDidMount() {
        this.props.fetchData('https://api.myjson.com/bins/6vbot')
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        
        return (
            <div className="wrapper">
                <DisplayTable data={this.props.data} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AllGO)
