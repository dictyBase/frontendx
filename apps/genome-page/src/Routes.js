import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Tabs from 'dicty-components-tab'
import GoTabs from './features/GeneOntology/GoTabs'

const tabs = [
    {
        title: 'Gene Summary',
        element: (
            <div>
              Gene Summary
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
            <GoTabs />
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

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={ () => <Redirect to="/gene/p2xA" /> } />
                    <Route path="/gene/:id" component={ props => <Tabs { ...props } tabs={ tabs } /> } />
                </Switch>
            </Router>
        )
    }
}