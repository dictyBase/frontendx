// @flow
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import Tabs from 'dicty-components-tab'
import GeneOntologyContainer from 'features/GeneOntology/GeneOntologyContainer'

const tabs: Array<Object> = [
    {
        title: 'Gene Summary',
        element: <div>Gene Summary</div>,
        link: 'summary'
    },
    {
        title: 'Protein Information',
        element: <div>Protein Information</div>,
        link: 'proteininformation'
    },
    {
        title: 'Gene Ontology',
        element: <GeneOntologyContainer />,
        link: 'go'
    },
    {
        title: 'Orthologs',
        element: <div>Orthologs</div>,
        link: 'orthologs'
    },
    {
        title: 'Phenotypes',
        element: <div>Phenotypes</div>,
        link: 'phenotypes'
    },
    {
        title: 'Reference',
        element: <div>Reference</div>,
        link: 'reference'
    },
    {
        title: 'BLAST',
        element: <div>BLAST</div>,
        link: 'blast'
    }
]

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={() => <Redirect to="/gene/p2xA" />}
                />
                <Route
                    path="/gene/:id"
                    component={props => <Tabs {...props} tabs={tabs} />}
                />
            </Switch>
        </Router>
    )
}

export default Routes
