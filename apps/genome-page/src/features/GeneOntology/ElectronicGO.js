import React, { Component } from 'react'
import DisplayTable from './DisplayTable'

export default class ElectronicGO extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        fetch('https://api.myjson.com/bins/6vbot')
            .then(res => res.json())
            .then(data => this.setState({ data }))
    }

    render() {
        const data = this.state.data.filter(code => code.evidence === 'IEA')
        return (
            <div className="wrapper">
                <DisplayTable data={data} />
            </div>
        )
    }
}
