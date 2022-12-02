import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  GrowthBook,
  GrowthBookProvider,
  useExperiment,
  useFeature,
} from '@growthbook/growthbook-react';
import { growthBookEnvKey } from '@app/config';
import { anonymousID, setAttributes } from '@app/lib/analytics';
import { useAppState } from './State';

export { useExperiment, useFeature };

const growthbook = new GrowthBook({
  // Allows you to use the Chrome DevTools Extension to test/debug.
  enableDevMode: true,
  trackingCallback: (experiment, result) => {
    console.log('trackingCallback', {
      experimentId: experiment.key,
      variationId: result.variationId,
    });
  },
});

const GrowthBookWrapper = ({ children }) => {
  const [ready, setReady] = useState(false);
  const { user } = useAppState();

  useEffect(() => {
    const attributes = (() => {
      if (user) {
        return {
          id: user.id,
          loggedIn: true,
          anonymousID,
        };
      } else {
        return {
          id: null,
          loggedIn: false,
          anonymousID,
        };
      }
    })();
    setAttributes(attributes);
    growthbook.setAttributes(attributes);
    fetch('http://localhost:3100/api/features/' + growthBookEnvKey + '?rand=' + uuid())
      .then((res) => res.json())
      .then((json) => {
        growthbook.setFeatures(json.features);
        setReady(true);
      });
  }, [
    user,
  ]);

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
