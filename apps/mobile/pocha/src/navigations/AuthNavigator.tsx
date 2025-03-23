// screens
import LandingScreen from '@/screens/LandingScreen';
import SignUpScreen from '@/screens/SignUpScreen';

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, Text, SafeAreaView} from 'react-native';
import {useAuthNavigation} from './useAuthNavigation';

const Stack = createNativeStackNavigator();

const HeaderBackButton = () => {
  const navigation = useAuthNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleGoBack}>
      <Text>Back</Text>
    </TouchableOpacity>
  );
};

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <HeaderBackButton />,
      }}>
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
