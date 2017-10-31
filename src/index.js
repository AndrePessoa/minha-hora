import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import panelsApp from './reducers'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker';

let store = createStore(panelsApp)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
