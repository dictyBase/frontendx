import React, { Component } from 'react'
import DisplayTable from './DisplayTable'

export default class ElectronicGO extends Component {
    render() {
        const data = this.props.data.filter(code => code.evidence === 'IEA')
        return (
            <div className="wrapper">
                <DisplayTable data={data} />
            </div>
        )
    }
}
