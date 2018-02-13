// @flow
import React from 'react'
import { Tab } from 'styles/style'

type Props = {
    name: string,
    label: string,
    onClick: Function,
    active: boolean
}

const TabItem = ({ name, label, onClick, active }: Props) => (
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
