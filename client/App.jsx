import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import SignInSide from './SignInSide';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import SignInSide from "./SignInSide";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SignInSide} />
        <Route path='/home' component={Dashboard} />
      </Switch>
    </Router>
  );
};
export default App;
