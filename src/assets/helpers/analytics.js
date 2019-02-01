import {GoogleAnalyticsSettings, GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge';

export default class googleAnalytics {
  /**
  setDryRun when enabled the native library prevents any data from being sent to Google Analytics.This allows you to test or debug the implementation, without your test data appearing in your Google Analytics reports.
  */
  GoogleAnalyticsSettings.setDryRun(false);
  /**
  setDispatchInterval allows you to configure how often (in seconds) the batches are sent to your tracker.
  */
  GoogleAnalyticsSettings.setDispatchInterval(parseInt(Config.GA_TRACKER_INTERVAL));
  /**
  Initialise the tracker based on the environment based tracker ID
  */

  let customDimensions = {
   CD_A: 'aaa',
   CD_B: 'bbb'
  };

/*
setter function for custom dimension
*/
  const setDimension = (dimension) => {
   customDimensions = {…customDimensions, …dimension};
  };


  export const setAppName = (appName) => {
   tracker.setAppName(appName);
  };
  export const setAppVersion = (appVersion) => {
   tracker.setAppVersion(appVersion);
  };

    /**
  category (required): String, category of event
  action (required): String, name of action
  optionalValues: Object
  label: String
  value: Number
  */
  export const trackEvent = (category, action, optionalValues = {}) => {
    tracker.trackEventWithCustomDimensionValues(category, action,   optionalValues, customDimensions);
  };
  /**
  track uncaught exceptions
  */
  export const setTrackUncaughtExceptions = (enabled = true) => {
    tracker.setTrackUncaughtExceptions(enabled);
  };
  /**
  track generic errors and exceptions
  */
  export const trackException = (error, fatal = false) => {
    tracker.trackException(error, fatal);
  };

  export const tracker =
  new GoogleAnalyticsTracker(Config.GA_TRACKER_ID,{CD_A: 1, CD_B: 2});
}
