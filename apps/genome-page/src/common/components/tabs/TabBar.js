// @flow
import React from "react"
import TabItem from "./TabItem"
import ToggleDisplay from "react-toggle-display"
import { TabContainer } from "styles/style"
import { Flex } from "rebass"
import { ThemeProvider } from "styled-components"

const theme = {
  primary: "#15317e",
  secondary: "#A3BAE9",
  tabText: "white",
}

type Props = {
  tabs: Array<Object>,
  currentTab: string,
  onTabClick: Function,
}

const TabBar = (props: Props) => {
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
      <ThemeProvider theme={theme}>
        <Flex justify="center" mx="auto">
          <TabContainer {...otherProps}>{tabItems}</TabContainer>
        </Flex>
      </ThemeProvider>
      <br />

      {tabPanels}
    </div>
  )
}

export default TabBar
