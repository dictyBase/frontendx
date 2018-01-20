import React, { Component } from 'react'
import AllGO from './AllGO'
import ExperimentalGO from './ExperimentalGO'
import ManualGO from './ManualGO'
import ElectronicGO from './ElectronicGO'
import TabBarContainer from './tabs/TabBarContainer'
import { Flex } from 'rebass'
import { ThemeProvider } from 'styled-components'

const theme = {
    primary: '#15317e',
    secondary: '#A3BAE9',
    tabText: 'white'
}

class GeneOntology extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        fetch('https://api.myjson.com/bins/6vbot')
            .then(res => res.json())
            .then(data => this.setState({ data }))
    }

    render() {
        const tabs = [
            { name: 'AllGO', label: 'All GO', component: AllGO },
            { name: 'ExperimentalGO', label: 'Experimental GO', component: ExperimentalGO },
            { name: 'ManualGO', label: 'Manual GO', component: ManualGO },
            { name: 'ElectronicGO', label: 'Electronic GO', component: ElectronicGO }
        ]

        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Flex justify="center" mx="auto">
                        <TabBarContainer tabs={tabs} />
                    </Flex>
                </ThemeProvider>
                <br />
            </div>
        )
    }
}

export default GeneOntology
