import React, { Component } from 'react'
import DisplayTable from './DisplayTable'

export default class ExperimentalGO extends Component {
    render() {
        const data = this.props.data.filter(
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
