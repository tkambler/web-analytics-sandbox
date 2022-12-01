import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Setup from '@app/components/Setup';
import TopBar from '@app/components/TopBar';
import { Routes } from './Routes';

function App(): React.ReactElement {
  return (
    <Setup>
      <TopBar />
      <Routes />
    </Setup>
  );
}

ReactDOM.render(<App />, document.getElementById('app-root'));
