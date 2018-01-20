import React from 'react'
import DisplayTable from './DisplayTable'

const AllGO = props => {
    return (
        <div className="wrapper">
            <DisplayTable data={props.data} />
        </div>
    )
}

export default AllGO