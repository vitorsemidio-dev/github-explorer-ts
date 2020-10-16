import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';
import User from '../pages/User';
import UserDetails from '../pages/UserDetails';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/repositories/:repository+" component={Repository} />
    <Route path="/users" exact component={User} />
    <Route path="/users/:user" component={UserDetails} />
  </Switch>
);

export default Routes;
