import React, { Component } from 'react'
import AllGO from './AllGO'
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
            { name: 'AllGO', label: 'All GO' },
            { name: 'ExperimentalGO', label: 'Experimental GO' },
            { name: 'ManualGO', label: 'Manual GO' },
            { name: 'ElectronicGO', label: 'Electronic GO' }
        ]

        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Flex justify="center" mx="auto">
                        <TabBarContainer tabs={tabs} />
                    </Flex>
                </ThemeProvider>
                <br />
                {/* <AllGO data={this.state.data} /> */}
            </div>
        )
    }
}

export default GeneOntology
