import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from './pages/Home'
import Settings from './pages/Settings'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home status="NonMember"/>
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    );
  }
}
