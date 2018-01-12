import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';
import './styles/style.css'
import './styles/style.js'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
