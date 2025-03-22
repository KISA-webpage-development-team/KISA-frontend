// import React from 'react';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {NavigationContainer} from '@react-navigation/native';
// import {UserProvider, useUser} from './contexts/UserContext';

// import MainNavigator from './navigations/MainNavigator';
// import AuthNavigator from './navigations/AuthNavigator';

// export default function PochaApp() {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <UserProvider>
//           <AppContent />
//         </UserProvider>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

// const AppContent = () => {
//   const {user} = useUser();
//   return user ? <MainNavigator /> : <AuthNavigator />;
// };

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider, useUser} from './contexts/UserContext';

import MainNavigator from './navigations/MainNavigator';
import AuthNavigator from './navigations/AuthNavigator';

import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {initializeApp} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBH_sBb3muZ8HluJPZEJ4PuLaQdpCIanqE',
  authDomain:
    'com.googleusercontent.apps.602978160198-tsvut54bce28nvlvvd0cm8feho3gapdm',
  projectId: 'kisa-mobile',
  storageBucket: 'kisa-mobile.firebasestorage.app',
  messagingSenderId: '602978160198',
  appId: '1:602978160198:ios:eb23556ea63e1e0cae0447',
};

// Ensure Firebase is only initialized once
let app;
if (!auth().app) {
  app = initializeApp(firebaseConfig);
}

export default function PochaApp() {
  const [isInitializing, setInitializing] = useState(true);

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
