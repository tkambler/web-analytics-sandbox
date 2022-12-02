import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '@app/Routes/Home';
import ButtonExperiment from '@app/Routes/ButtonExperiment';

export function Routes(): React.ReactElement {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/button-experiment" exact component={ButtonExperiment} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
