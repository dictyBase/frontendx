import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/layout/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './app/rootReducer'
import registerServiceWorker from './registerServiceWorker'
import './styles/style.css'
import './styles/style.js'

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
