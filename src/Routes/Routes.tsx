import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '@app/Routes/Home';

export function Routes(): React.ReactElement {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
