import * as React from 'react';
import { useAppState } from '@app/components/Setup';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '@app/Routes/Home';
import Login from '@app/Routes/Login';

export function Routes(): React.ReactElement {

  const { user } = useAppState();

  return (
    <div
      style={{
        padding: 15,
      }}
    >
       { user && <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch> }
      { !user && <Login /> }
    </div>
  );

}

export default Routes;
