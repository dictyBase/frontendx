import React, { Component } from 'react'
import DisplayTable from './DisplayTable'

export default class AllGO extends Component {
    render() {
        const data = this.props.data
        return (
            <div className="wrapper">
                <DisplayTable data={data} />
            </div>
        )
    }
}
