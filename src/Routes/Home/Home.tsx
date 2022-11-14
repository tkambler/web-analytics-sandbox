import React from 'react';
import { useAppState } from '@app/components/Setup';
import { track } from '@app/lib/analytics';
import ExperimentalButton from './ExperimentalButton';
import LoginPanel from './LoginPanel';
import LogoutPanel from './LogoutPanel';
import Widget from './Widget';

export function Home() {

  const { user } = useAppState();

  return (
    <div>
      { !user ? <LoginPanel /> : <LogoutPanel /> }
      <ExperimentalButton
        onClick={() => {
          console.log('The button was clicked.');
          track('Button clicked.');
        }}
      />
      <Widget />
    </div>
  );
}

export default Home;
