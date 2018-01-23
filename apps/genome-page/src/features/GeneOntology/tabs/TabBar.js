import React from 'react'
import TabItem from './TabItem'
import ToggleDisplay from 'react-toggle-display'
import { TabContainer } from 'styles/style'

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

    const tabPanels = tabs.map(tabInfo => {
        const { name, component: TabComponent } = tabInfo

        return (
            <ToggleDisplay show={name === currentTab} key={name}>
                <TabComponent />
            </ToggleDisplay>
        )
    })

    return (
        <div>
            <TabContainer {...otherProps}>{tabItems}</TabContainer>
            { tabPanels }
        </div>
    )
}

export default TabBar
