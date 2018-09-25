import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import panelsApp from './reducers'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker';

import { verifyPanels, verifyResult } from './reducers/middleware';

let store = createStore(panelsApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(verifyPanels, verifyResult))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
