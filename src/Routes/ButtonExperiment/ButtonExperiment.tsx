import React from 'react';
import { track } from '@app/lib/analytics';
import ExperimentalButton from './ExperimentalButton';

export function Home() {
  return (
    <div>
      <ExperimentalButton
        onClick={() => {
          console.log('The button was clicked.');
          track('button_clicked');
        }}
      />
    </div>
  );
}

export default Home;
