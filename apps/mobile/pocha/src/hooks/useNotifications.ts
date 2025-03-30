import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';

// Custom hook to handle push notification setup
export const usePushNotifications = () => {
  // Request permission for notifications
  const requestPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  // Foreground notification for
  const setupForegroundHandler = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification?.title || 'Foreground test notification',
        remoteMessage.notification?.body ||
          'This is a forground test notification.',
      );
    });
    return unsubscribe;
  };

  // Setup all notification logic
  useEffect(() => {
    // Request permission on mount
    requestPermission();

    // Handle foreground notifications
    const unsubscribeForeground = setupForegroundHandler();

    // Cleanup on unmount
    return () => {
      unsubscribeForeground();
    };
  }, []);

  // Background handler (must be set outside of React lifecycle)
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
};
