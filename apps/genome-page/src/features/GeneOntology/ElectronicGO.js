import React from 'react'
import DisplayTable from './DisplayTable'

const ElectronicGO = props => {
    const data = props.data.filter(code => code.evidence === 'IEA')
    
    return (
        <div className="wrapper">
            <DisplayTable data={data} />
        </div>
    )
}

export default ElectronicGO
