import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

// import AlertIcon from '@/assets/icons/alert.svg';

interface ErrorDisplayProps {
  fullScreen?: boolean;
  state?: string;
  message?: string;
}
export default function ErrorDisplay({
  fullScreen = false,
  state,
  message,
}: ErrorDisplayProps) {
  if (!message) return null;

  if (fullScreen) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <Text
          style={[
            styles.text,
            state === 'error' ? styles.error : styles.alert,
          ]}>
          {message}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Text
        style={[styles.text, state === 'error' ? styles.error : styles.alert]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    fontFamily: 'Sejong-hospital-Bold',
  },
  error: {
    color: 'gray',
  },
  alert: {
    color: 'red',
  },
});
