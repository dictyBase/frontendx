import React, { Component } from 'react'
import DisplayTable from './DisplayTable'

export default class ExperimentalGO extends Component {
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
                code.evidence === 'IDA'
        )
        return (
            <div className="wrapper">
                <DisplayTable data={data} />
            </div>
        )
    }
}
