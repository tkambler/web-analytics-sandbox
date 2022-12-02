import { v4 as uuid } from 'uuid';
import cookies from 'js-cookie';
import { Events } from '@app/types';

const cookieName = 'WEB_ANALYTICS_SANDBOX_ANONYMOUS_ID';
const attributes = {};

export const getAnonymousID = () => {
  const value = cookies.get(cookieName);
  if (value) {
    console.log('Anonymous ID read from cookie:', value);
    return value;
  }
  const newValue = uuid();
  console.log('Assigning anonymous ID to user:', newValue);
  cookies.set(cookieName, newValue, {
    expires: 200,
  });
  return newValue;
};

/**
 * Umami is loaded via a script tag in the page header.
 *
 * @see https://umami.is/docs/tracker-functions
 */
declare var umami: any;

export const anonymousID = getAnonymousID();

console.log('anonymousID is:', anonymousID);

export const setAttributes = attrs => {
  Object.assign(attributes, attrs);
};

export const track = (eventName: Events, eventMeta?: Record<string, any>) => {
  umami.trackEvent(eventName, {
    ...(eventMeta || {}),
    ...attributes,
  });
};
