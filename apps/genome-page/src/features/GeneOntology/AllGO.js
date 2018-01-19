import React, { Component } from 'react'
import DisplayTable from './DisplayTable'

export default class AllGO extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        fetch('https://api.myjson.com/bins/erxtx')
            .then(res => res.json())
            .then(data => this.setState({ data }))
    }

    render() {
        const data = this.state.data
        return (
            <div className="wrapper">
                <DisplayTable data={data} />
            </div>
        )
    }
}
