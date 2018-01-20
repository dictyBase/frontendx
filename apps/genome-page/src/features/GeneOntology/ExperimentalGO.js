import React from 'react'
import DisplayTable from './DisplayTable'

const ExperimentalGO = props => {
    const data = props.data.filter(
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

export default ExperimentalGO
