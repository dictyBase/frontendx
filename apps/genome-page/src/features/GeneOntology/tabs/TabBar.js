import React from 'react'
import TabItem from './TabItem'
import { TabContainer } from '../../../styles/style'

const TabBar = props => {
    const { tabs, currentTab, onTabClick, ...otherProps } = props

    const tabItems = tabs.map(tabInfo => {
        const { name, label } = tabInfo

        return (
            <TabItem
                key={name}
                name={name}
                label={label}
                active={currentTab === name}
                onClick={onTabClick}
            />
        )
    })

    return (
        <div>
            <TabContainer {...otherProps}>
                {tabItems}
            </TabContainer>
        </div>
    )
}

export default TabBar
