import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from './contexts/UserContext';

import MainNavigator from './navigations/MainNavigator';
import AuthNavigator from './navigations/AuthNavigator';
import {SimpleUser} from './types/user';
export default function PochaApp() {
  const fakeUser: SimpleUser = {
    email: 'johndoe@umich.edu',
    fullname: 'John Doe',
    major: 'Computer Science',
    gradYear: 2025,
    linkedin: 'https://www.linkedin.com/in/johndoe/',
  };

  const [user, setUser] = useState<SimpleUser | undefined>(undefined);

  useEffect(() => {
    // const user = await AsyncStorage.getItem('user');
    // [TODO] get user from somewhere with Google OAuth (Firebase Auth)
    // setUser(user);
    // [NOTE] for now, use fake user
    // IF YOU ARE WORKING ON AUTH NAVIGATION, COMMENT LINE BELOW
    setUser(fakeUser);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <UserProvider>
          {user ? <MainNavigator /> : <AuthNavigator />}
        </UserProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
