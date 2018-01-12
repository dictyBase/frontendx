import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';
import './features/FrontPage/HomeStyle.css'
import './features/FrontPage/HomeStyle.js'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
