import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import "../App.scss";
import Nav from "./Nav.js";

import PanelSalary from "./PanelSalary.js";
import PanelHours from "./PanelHours.js";
import PanelResources from "./PanelResources.js";
import PanelResult from "./PanelResult.js";
import PanelFormComplete from "./PanelFormComplete.js";
import PanelEnd from "./PanelEnd.js";

/*import PanelEnd from "./PanelEnd.js";*/
import Illustrations from "./Illustrations.svg.js";
import Logo from "./Logo.svg.js";

function App() {
  return (
    <div className="app">
      <Router>
        <main>
          <div id="top">
            <h1 id="logo">
              <Logo />
            </h1>
            <Nav />
          </div>
          <div id="panels">
            <Switch>
              <Route path="/salary" component={PanelSalary} />
              <Route path="/hours" component={PanelHours} />
              <Route path="/resources" component={PanelResources} />
              <Route path="/result" component={PanelResult} />
              <Route path="/complete" component={PanelFormComplete} />
              <Route path="/end" component={PanelEnd} />

              <Route path="*" component={PanelSalary} />
            </Switch>
          </div>
        </main>
      </Router>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    inputs: state.inputs,
    panels: state.panels,
  };
}

export default connect(mapStateToProps)(App);
