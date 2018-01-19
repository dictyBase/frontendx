import React, { Component } from 'react'
import DisplayTable from './DisplayTable'

export default class ManualGO extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        fetch('https://api.myjson.com/bins/erxtx')
            .then(res => res.json())
            .then(data => this.setState({ data }))
    }

    render() {
        const data = this.state.data.filter(
            code =>
                code.evidence === 'IMP' ||
                code.evidence === 'IGI' ||
                code.evidence === 'IDA' ||
                code.evidence === 'IBA'
        )
        return (
            <div className="wrapper">
                <DisplayTable data={data} />
            </div>
        )
    }
}
