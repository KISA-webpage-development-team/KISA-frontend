// [NOTE] this will be moved to the "host" app after the "pocha" app is completed

import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React from 'react';

// hooks
import {useUser} from '@/contexts/UserContext';
import {useAuthNavigation} from '@/navigations/useAuthNavigation';

export default function LandingScreen() {
  const navigation = useAuthNavigation();
  const {signInWithGoogle} = useUser();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      if (!result.success) {
        navigation.navigate('SignUpScreen');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with Google');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mImageContainer}>
        <Image
          source={require('@/assets/images/lighter_block_m.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      {/* FIX ME From here */}
      {/* <Text style={styles.logo}>Developed by ...</Text> */}
      <View style={styles.bottomSection}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>UMich KISA</Text>
          <Text style={styles.subtitle}>Welcome to our new Pocha App.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSignInWithGoogle}>
            <View style={styles.loginContent}>
              <Image
                source={require('@/assets/images/google_logo.png')}
                style={styles.logo}
              />
              <Text style={styles.text}>Sign in with Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.clickableText}>
              Don't have an account? Click here!
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
    backgroundColor: '#446ab7',
  },
  mImageContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    height: 500,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: -100,
    left: '-50%',
    width: '200%',
    height: '110%',
  },
  textContainer: {
    marginTop: 80,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Sejong-hospital-Bold',
    fontWeight: '600',
    marginBottom: 10,
    color: 'white',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Sejong-hospital-Bold',
    color: 'white',
  },
  buttonContainer: {
    marginTop: 35,
    width: '100%',
    paddingBottom: 40,
    padding: 16,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 16,
    fontFamily: 'Sejong-hospital-Bold',
    width: '100%',
  },
  loginContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    width: 40,
    height: 40,
    // right: 5,
    left: -30,
  },
  text: {
    fontSize: 16,
    color: '#3c4043',
    fontFamily: 'Sejong-hospital-Bold',
    left: 20,
  },
  clickableText: {
    color: 'white', // iOS-style link blue
    textDecorationLine: 'underline',
    fontSize: 14,
    alignItems: 'center',
    fontFamily: 'Sejong-hospital-Bold',
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // logo: {
  //   position: 'absolute',
  //   top: 60,
  //   left: 20,
  //   fontSize: 10,
  //   fontWeight: 'bold',
  //   color: 'black',
  //   opacity: 0.9,
  // },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',

    width: '100%',
  },
});
