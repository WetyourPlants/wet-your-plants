import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import SignInSide from './SignInSide';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import SignInSide from "./SignInSide";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
            <SignInSide />
          </Route>
          <Route path='/home'>
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
