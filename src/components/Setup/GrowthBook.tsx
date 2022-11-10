import React, { useEffect, useState } from 'react';
import {
  GrowthBook,
  GrowthBookProvider,
  useFeature,
} from '@growthbook/growthbook-react';
import { growthBookEnvKey } from '@app/config';

export { useFeature };

const growthbook = new GrowthBook({
  // Allows you to use the Chrome DevTools Extension to test/debug.
  enableDevMode: true,
  trackingCallback: (experiment, result) => {
    console.log({
      experimentId: experiment.key,
      variationId: result.variationId,
    });
  },
});

const GrowthBookWrapper = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3100/api/features/' + growthBookEnvKey)
      .then((res) => res.json())
      .then((json) => {

        growthbook.setFeatures(json.features);

        /*
        // TODO: replace with real targeting attributes
        growthbook.setAttributes({
          "id": "foo",
          "deviceId": "foo",
          "company": "foo",
          "loggedIn": true,
          "employee": true,
          "country": "foo",
          "browser": "foo",
          "url": "foo"
        });
        */

        setReady(true);
      });
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <GrowthBookProvider growthbook={growthbook}>{children}</GrowthBookProvider>
  );
};

export const withGrowthBook = (Component) => {
  return (props) => (
    <GrowthBookWrapper>
      <Component {...props} />
    </GrowthBookWrapper>
  );
};
