import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useAppState, withSetup } from '@app/components/Setup';
import TopBar from '@app/components/TopBar';
import Login from '@app/Routes/Login';
import { Routes } from './Routes';

const App = (): React.ReactElement => {
  const { user } = useAppState();
  if (!user) {
    return <Login />;
  }
  return (
    <TopBar>
      <Routes />
    </TopBar>
  );
};

const Composed = withSetup(App);

ReactDOM.render(<Composed />, document.getElementById('app-root'));
