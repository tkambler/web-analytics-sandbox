import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '@app/Routes/Home';
import ButtonExperiment from '@app/Routes/ButtonExperiment';
import MyAccount from '@app/Routes/MyAccount';

export function Routes(): React.ReactElement {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/button-experiment" exact component={ButtonExperiment} />
      <Route path="/account" exact component={MyAccount} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
