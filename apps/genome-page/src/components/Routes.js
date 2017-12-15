import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tabs from 'dicty-components-tab'
import { Panel, PanelBody, PanelTitle, PanelHeader } from 'dicty-components-panel'
import Main from './Main'

const Content = (title, content) => {
    return (
        <Panel collapse>
          <PanelHeader>
            <PanelTitle>
              { title }
            </PanelTitle>
          </PanelHeader>
          <PanelBody>
            { content }
          </PanelBody>
        </Panel>
    )
}

const tabs = [
    {
        title: 'All GO',
        element: (
            <div>
              { Content('Blast', 'Content Goes Here') }
              { Content('Content 2', 'P1????????\nP2~~~~~~~~~~~~~\n\nP3!!!!!!!!!!!!!') }
            </div>
        ),
        link: 'all'
    },
    {
        title: 'Manual GO',
        element: (
            <div style={ {height: 100, background: 'blue'} }>Content goes here</div>
        ),
        link: 'manual'
    },
    {
        title: 'Experimental GO',
        element: (
            <div style={ {height: 100, background: 'red'} }>Content goes here</div>
        ),
        link: 'experimental'
    },
    {
        title: 'Electronic GO',
        element: (
            <div style={ {height: 100, background: 'yellow'} }>Content goes here</div>
        ),
        link: 'electronic'
    }
]

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <div>
                <Route exact path="/" component={ () => <Main /> } />
                <Route path="/annotations/:id" component={ props => <Tabs { ...props } tabs={ tabs } /> } />
                </div>
            </Router>
        )
    }
}