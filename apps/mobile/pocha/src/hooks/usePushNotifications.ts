import {useEffect} from 'react';
// import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import {useUser} from '@/contexts/UserContext';
import {registerToken} from '@/apis/mutations';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// Custom hook to handle push notification setup
export const usePushNotifications = () => {
  // Get session user information
  const {user} = useUser();

  const requestPermissionAndGetToken = async () => {
    try {
      // Request permission for iOS
      const result = await PushNotificationIOS.requestPermissions({
        alert: true,
        badge: true,
        sound: true,
      });
    } catch (error) {
      console.error('[PushNotifications] Error requesting permissions:', error);
    }
  };

  const setupNotificationListeners = () => {
    // Listen for the device token
    PushNotificationIOS.addEventListener('register', async token => {
      if (user) {
        try {
          await registerToken({token: token, email: user.email});
        } catch (error) {
          console.error('[PushNotifications] Error registering token:', error);
        }
      }
    });

    // Error handler
    PushNotificationIOS.addEventListener('registrationError', error => {
      console.error('[PushNotifications] Registration error:', error);
    });

    // Notification handler
    PushNotificationIOS.addEventListener('notification', notification => {
      const {title, body} = notification.getData().aps?.alert || {};
      Alert.alert(title || 'Notification', body || 'You have a new message');
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    });
  };

  // Setup all notification logic
  useEffect(() => {
    if (Platform.OS === 'ios' && user) {
      console.log('[PushNotifications] Initializing push notifications...');
      setupNotificationListeners();
      requestPermissionAndGetToken();

      // Cleanup on unmount
      return () => {
        PushNotificationIOS.removeEventListener('register');
        PushNotificationIOS.removeEventListener('notification');
        PushNotificationIOS.removeEventListener('registrationError');
      };
    }
  }, [user]);
};
