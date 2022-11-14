import React, { useEffect } from 'react';
import { id, track } from '@app/lib/analytics';
import { useAppState } from './State';

const SetupEventsProvider = ({ children }) => {

  const { user } = useAppState();

  useEffect(() => {
    if (user) {
      id({
        id: user.id,
      });
    } else {
      id({
        id: null,
      });
    }
  }, [
    user,
  ]);

  useEffect(() => {
    track('Application render');
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
