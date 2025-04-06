/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// Handle background notifications
PushNotificationIOS.addEventListener('notification', notification => {
  notification.finish(PushNotificationIOS.FetchResult.NoData);
});

AppRegistry.registerComponent(appName, () => App);
