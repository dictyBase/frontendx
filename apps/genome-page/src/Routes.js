import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Tabs from 'dicty-components-tab'
import AllGO from './features/GeneOntology/AllGO'
import ElectronicGO from './features/GeneOntology/ElectronicGO'
import ExperimentalGO from './features/GeneOntology/ExperimentalGO'
import ManualGO from './features/GeneOntology/ManualGO'

const mainTabs = [
    {
        title: 'Gene Summary',
        element: (
            <div>
              General Information
            </div>
        ),
        link: 'summary'
    },
    {
        title: 'Protein Information',
        element: (
            <div>
              Protein Information
            </div>
        ),
        link: 'proteininformation'
    },
    {
        title: 'Gene Ontology',
        element: (
            <AllGO />
        ),
        link: 'go'
    },
    {
        title: 'Orthologs',
        element: (
            <div>
              Orthologs
            </div>
        ),
        link: 'orthologs'
    },
    {
        title: 'Phenotypes',
        element: (
            <div>
              Phenotypes
            </div>
        ),
        link: 'phenotypes'
    },
    {
        title: 'Reference',
        element: (
            <div>
              Reference
            </div>
        ),
        link: 'reference'
    },
    {
        title: 'BLAST',
        element: (
            <div>
              BLAST
            </div>
        ),
        link: 'blast'
    }
]

const tabs = [
    {
        title: 'All GO',
        element: (
            <AllGO />
        ),
        link: 'all'
    },
    {
        title: 'Manual GO',
        element: (
            <ManualGO />
        ),
        link: 'manual'
    },
    {
        title: 'Experimental GO',
        element: (
            <ExperimentalGO />
        ),
        link: 'experimental'
    },
    {
        title: 'Electronic GO',
        element: (
            <ElectronicGO />
        ),
        link: 'electronic'
    }
]

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={ () => <Redirect to="/gene/p2xA" /> } />
                    <Route path="/gene/:id" component={ props => <Tabs { ...props } tabs={ mainTabs } /> } />
                    <Route path="/gene/:id/go" component={ props => <Tabs { ...props } tabs={ tabs } /> } />
                </Switch>
            </Router>
        )
    }
}