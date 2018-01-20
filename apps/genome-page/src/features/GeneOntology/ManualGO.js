import React from 'react'
import DisplayTable from './DisplayTable'

const ManualGO = props => {
    const data = this.props.data.filter(
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

export default ManualGO
