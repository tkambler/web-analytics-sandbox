import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  GrowthBook,
  GrowthBookProvider,
  useExperiment,
  useFeature,
} from '@growthbook/growthbook-react';
import { useLocation } from '@app/lib/hooks';
import { growthBookEnvKey } from '@app/config';
import { anonymousID, setAttributes, track } from '@app/lib/analytics';
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
    track('experiment_viewed', {
      experimentId: experiment.key,
      variationId: result.variationId,
    });
  },
});

const GrowthBookWrapper = ({ children }) => {

  const location = useLocation();
  const [ready, setReady] = useState(false);
  const { user } = useAppState();

  const attributes = useMemo(() => {
    if (user) {
      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        loggedIn: true,
        anonymousID,
        path: location.pathname,
      };
    } else {
      return {
        id: null,
        loggedIn: false,
        anonymousID,
        path: location.pathname,
      };
    }
  }, [
    user,
    location,
  ]);

  useEffect(() => {
    console.log('Setting user attributes:', attributes);
    setAttributes(attributes);
    growthbook.setAttributes(attributes);
  }, [
    attributes,
  ]);

  useEffect(() => {
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
