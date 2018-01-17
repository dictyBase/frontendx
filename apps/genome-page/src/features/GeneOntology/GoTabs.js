import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Tabs, TabItem } from 'rebass'
import styled, { ThemeProvider } from 'styled-components'
import { lighten } from 'polished'

const theme = {
    primary: '#15317e',
    secondary: '#A3BAE9',
    tabText: 'white'
}

const TabRow = styled(Tabs)`
    border-bottom: 0px;
`

const Tab = styled(TabItem)`
    background: #A3BAE9;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-left: 1px solid black;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
    margin-right: 3px;
    margin-top: 1px;
    padding: 5px;

    &:hover {
    background: ${ props => !props.active && props.theme.secondary ? lighten(0.1, props.theme.secondary) : '#15317e' };
  }
`

const Link = styled(RouterLink)`
    text-decoration: none;
    padding: 10px 15px;
    color: black;
`

const GoTabs = () => {
    return (
        <ThemeProvider theme={theme}>
            <TabRow>
                <Tab>
                    <Link to="/gene/:id/go">All GO</Link>
                </Tab>
                <Tab>
                    <Link to="/gene/:id/go">Manual GO</Link>
                </Tab>
                <Tab>
                    <Link to="/gene/:id/go">Experimental GO</Link>
                </Tab>
                <Tab>
                    <Link to="/gene/:id/go">Electronic GO</Link>
                </Tab>
            </TabRow>
        </ThemeProvider>
    )
}

export default GoTabs