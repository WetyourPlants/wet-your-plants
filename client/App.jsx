import React from 'react';
import Dashboard from './components/Dashboard';
import SignInSide from './SignInSide';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import SignInSide from "./SignInSide";
import SignUp from './components/SignUp';

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
          <Route path='/signup'>
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
