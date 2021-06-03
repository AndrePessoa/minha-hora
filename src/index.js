import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import panelsApp from "./reducers";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import { verifyPanels, verifyResult } from "./reducers/middleware";
import { loadState, saveState } from "./reducers/persist";

const persistedState = loadState();
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(verifyPanels, verifyResult));

let store = createStore(panelsApp, persistedState, enhancer);
store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
