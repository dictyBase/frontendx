import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Tabs } from 'dicty-components-tab'
import App from '../App'

const tabs = [
    {
        title: 'All GO',
        element: (
            <div>
              <p>Content goes here</p>
            </div>
        ),
        link: 'blast'
    },
    {
        title: 'Manual GO',
        element: (
            <div style={ {height: 100, background: 'blue'} }>Content goes here</div>
        ),
        link: 'protein'
    },
    {
        title: 'Experimental GO',
        element: (
            <div style={ {height: 100, background: 'blue'} }>Content goes here</div>
        ),
        link: 'protein'
    },
    {
        title: 'Electronic GO',
        element: (
            <div style={ {height: 100, background: 'blue'} }>Content goes here</div>
        ),
        link: 'protein'
    }
]

class Main extends Component {
    render() {
        return (
            <Router>
              <div>
                <Route exact path="/" component={ () => <App /> } />
                {/* You must pass props from the Route to the Tabs component */}
                <Route path="/annotations/Manual" component={ props => <Tabs { ...props } tabs={ tabs } /> } />
                <Route path="/annotations/Experimental" component={ props => <Tabs { ...props } tabs={ tabs } /> } />
                <Route path="/annotations/Electronic" component={ props => <Tabs { ...props } tabs={ tabs } /> } />
              </div>
            </Router>
        )
    }
}

export default Main