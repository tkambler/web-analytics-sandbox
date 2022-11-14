// import { v4 as uuid } from 'uuid';
import cookies from 'js-cookie';

// const cookieName = 'WEB_ANALYTICS_SANDBOX_ANONYMOUS_ID';

// export const getAnonymousID = () => {
//   const value = cookies.get(cookieName);
//   if (value) {
//     console.log('Anonymous ID read from cookie:', value);
//     return value;
//   }
//   const newValue = uuid();
//   console.log('Assigning anonymous ID to user:', newValue);
//   cookies.set(cookieName, newValue, {
//     expires: 200,
//   });
//   return newValue;
// };

/**
 * Umami is loaded via a script tag in the page header.
 *
 * @see https://umami.is/docs/tracker-functions
 */
// declare var umami: any;

declare var jitsu: any;

// export const trackEvent = (
//   eventName: string,
//   eventMeta?: Record<string, any>,
//   url?: string,
//   siteId?: string
// ) => {
//   eventMeta = eventMeta || {};
//   Object.assign(eventMeta, {
//     anonymousID: getAnonymousID(),
//   });
//   umami.trackEvent(eventName, eventMeta, url, siteId);
// };

// export const trackView = (url: string, referrer?: string, siteId?: string) => {
//   umami.trackView(url, referrer, siteId);
// };

// Jitsu

export const anonymousID = cookies.get('__eventn_id');

console.log('anonymousID is:', anonymousID);

export const set = (properties: Record<string, any>) => {
  jitsu('set', properties);
};

export const id = (properties: Record<string, any>) => {
  jitsu('id', properties);
};

export const track = (eventName: string, eventMeta?: Record<string, any>) => {
  jitsu('track', eventName, eventMeta);
};
