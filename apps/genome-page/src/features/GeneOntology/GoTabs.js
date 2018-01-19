import React, { Component } from 'react'
import AllGO from './AllGO'
import ElectronicGO from './ElectronicGO'
import ExperimentalGO from './ExperimentalGO'
import ManualGO from './ManualGO'
import { Flex, Tabs, TabItem } from 'rebass'
import styled, { ThemeProvider } from 'styled-components'
import { lighten } from 'polished'

const TabList = ['All GO', 'Experimental GO', 'Manual GO', 'Electronic GO']

const theme = {
    primary: '#15317e',
    secondary: '#A3BAE9',
    tabText: 'white'
}

const TabContainer = styled(Tabs)`
    border-bottom: 0px;
`

const Tab = styled(TabItem)`
    background: ${ props => !props.active && props.theme.secondary ? '#A3BAE9' : '#15317e' };
    border-top: 1px solid white;
    border-right: 1px solid black;
    border-left: 1px solid black;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
    margin-right: 3px;
    margin-top: 1px;
    padding: 5px;
    width: 150px;
    color: ${ props => !props.active && props.theme.secondary ? 'black' : 'white' };
    border-color: ${ props => props.active ? 'black' : ''};

    &:hover {
        background: ${ props => !props.active && props.theme.secondary ? lighten(0.1, props.theme.secondary) : '#15317e' };
        color: ${ props => !props.active && props.theme.secondary ? 'black' : 'white' };;
        cursor: pointer;
    }
`

class GoTabs extends Component {
    state = {
        active: 0
    }

    setActive = active => {
        this.setState({ active })
    }

    renderTabs = ({ value, index }) => {
        const { active } = this.state
        const isActive = index === active

        return (
            <Tab
                key={index}
                active={isActive}
                onClick={e => {
                    this.setActive(index)
                }}
            >
                { value }
            </Tab>
        )
    }

    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <TabContainer>
                        <Flex justify='center' mx='auto'>
                            {TabList.map((value, index) =>
                                this.renderTabs({ value, index })
                            )}
                        </Flex>
                    </TabContainer>
                </ThemeProvider>
                <br />
                <AllGO />
            </div>
        )
    }
}

export default GoTabs