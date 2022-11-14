import React from 'react';

const IdentityProvider = ({ children }) => {
  return <>{children}</>;
};

export const withIdentity = (Component) => {
  return (props) => (
    <IdentityProvider>
      <Component {...props} />
    </IdentityProvider>
  );
};
