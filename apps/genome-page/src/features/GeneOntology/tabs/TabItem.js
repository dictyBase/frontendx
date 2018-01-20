import React from 'react'
import { Tab } from '../../../styles/style'

const TabItem = ({ name, label, onClick, active }) => (
    <Tab
        name={name}
        content={label}
        active={active}
        onClick={() => onClick(name)}
    >
    { name }
    </Tab>
)

export default TabItem
