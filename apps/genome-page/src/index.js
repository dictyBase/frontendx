import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'app/configureStore'
import App from 'app/layout/App'
import registerServiceWorker from './registerServiceWorker'
import 'whatwg-fetch'

import 'styles/style.css'
import 'styles/style.js'

const initialState = {
    data: []
}

const store = configureStore(initialState)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
