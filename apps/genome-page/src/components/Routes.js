import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tabs from 'dicty-components-tab'
import Main from './Main'
import All from './annotations/All'
import Electronic from './annotations/Electronic'
import Experimental from './annotations/Experimental'
import Manual from './annotations/Manual'

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
                <div>
                <Route exact path="/" component={ () => <Main /> } />
                <Route path="/annotations" component={ props => <Tabs { ...props } tabs={ tabs } /> } />
                </div>
            </Router>
        )
    }
}