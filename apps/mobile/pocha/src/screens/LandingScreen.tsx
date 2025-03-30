// [NOTE] this will be moved to the "host" app after the "pocha" app is completed

import {View, Text, Button, SafeAreaView} from 'react-native';
import React from 'react';

// hooks
import {useUser} from '@/contexts/UserContext';
import {useAuthNavigation} from '@/navigations/useAuthNavigation';

export default function LandingScreen() {
  const navigation = useAuthNavigation();
  const {signInWithGoogle} = useUser();

  const handleSignInWithGoogle = async () => {
    const result = await signInWithGoogle();
    // do something when result fails
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Welcome to Pocha</Text>
      <Button title="Sign in with Google" onPress={handleSignInWithGoogle} />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUpScreen')}
      />
    </SafeAreaView>
  );
}
