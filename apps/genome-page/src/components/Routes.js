import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Tabs from 'dicty-components-tab'
import Home from './Home'
import All from './go/All'
import Electronic from './go/Electronic'
import Experimental from './go/Experimental'
import Manual from './go/Manual'

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
            <div>
              Gene Ontology
            </div>
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
            <All />
        ),
        link: 'all'
    },
    {
        title: 'Manual GO',
        element: (
            <Manual />
        ),
        link: 'manual'
    },
    {
        title: 'Experimental GO',
        element: (
            <Experimental />
        ),
        link: 'experimental'
    },
    {
        title: 'Electronic GO',
        element: (
            <Electronic />
        ),
        link: 'electronic'
    }
]

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                <Route exact path="/" component={ () => <Home /> } />
                <Route path="/gene/:id" component={ props => <Tabs { ...props } tabs={ mainTabs } /> } />
                <Route path="/gene/:id/go" component={ props => <Tabs { ...props } tabs={ tabs } /> } />
                </Switch>
            </Router>
        )
    }
}