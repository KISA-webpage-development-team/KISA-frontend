import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider, useUser} from './contexts/UserContext';

import MainNavigator from './navigations/MainNavigator';
import AuthNavigator from './navigations/AuthNavigator';

import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Ensure Firebase is only initialized once
let app;
if (!auth().app) {
  app = firebase.initializeApp(firebaseConfig);
}

export default function PochaApp() {
  const [isInitializing, setInitializing] = useState(true);

  // Make sure firebase is ready before rendering the app
  useEffect(() => {
    const checkFirebaseReady = async () => {
      try {
        await auth().currentUser;
      } catch (error) {
        console.error('Firebase initialization error:', error);
      } finally {
        setInitializing(false);
      }
    };

    checkFirebaseReady();
  }, []);

  if (isInitializing) {
    // [TODO] this should be a splash screen
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}

const AppContent = () => {
  const {user} = useUser();
  return user ? <MainNavigator /> : <AuthNavigator />;
};
