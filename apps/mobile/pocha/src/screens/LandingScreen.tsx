// [NOTE] this will be moved to the "host" app after the "pocha" app is completed

import {View, Text, Button, SafeAreaView} from 'react-native';
import React from 'react';

// hooks
import {useAuthNavigation} from '@/navigations/useAuthNavigation';

export default function LandingScreen() {
  const navigation = useAuthNavigation();

  return (
    <SafeAreaView>
      <Text>LandingScreen</Text>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUpScreen')}
      />
    </SafeAreaView>
  );
}
