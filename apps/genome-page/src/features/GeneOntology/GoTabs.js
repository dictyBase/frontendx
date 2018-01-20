import React, { Component } from 'react'
import AllGO from './AllGO'
import ElectronicGO from './ElectronicGO'
import ExperimentalGO from './ExperimentalGO'
import ManualGO from './ManualGO'
import { TabContainer, Tab } from '../../styles/style'
import { Flex } from 'rebass'
import { ThemeProvider } from 'styled-components'

const TabList = ['All GO', 'Experimental GO', 'Manual GO', 'Electronic GO']

const theme = {
    primary: '#15317e',
    secondary: '#A3BAE9',
    tabText: 'white'
}

class GoTabs extends Component {
    state = {
        active: 0,
        data: []
    }

    componentDidMount() {
        fetch('https://api.myjson.com/bins/6vbot')
            .then(res => res.json())
            .then(data => this.setState({ data }))
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
                <AllGO data={this.state.data} />
            </div>
        )
    }
}

export default GoTabs