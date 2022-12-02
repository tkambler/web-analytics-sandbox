import React, { useEffect } from 'react';
import { track } from '@app/lib/analytics';

const SetupEventsProvider = ({ children }) => {
  useEffect(() => {
    track('app_rendered');
  }, []);

  return <>{children}</>;
};

export const withSetupEvents = (Component) => {
  return (props) => (
    <SetupEventsProvider>
      <Component {...props} />
    </SetupEventsProvider>
  );
};
