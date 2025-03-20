import React from 'react';
// import Info_Icon from '../../../assets/icons/info_icon.svg';
import {View, Text, StyleSheet} from 'react-native';

interface ErrorDisplayProps {
  state?: string; // Error state, optional
  message?: string; // Error message, optional
}

export default function ErrorDisplay({state, message}: ErrorDisplayProps) {
  if (!message) return null; // If no error message, don't render anything

  return (
    <View style={styles.container}>
      {/* <Info_Icon color={state} /> */}
      <Text
        style={[styles.text, state === 'error' ? styles.error : styles.alert]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Equivalent to flexbox's "flex items-center gap-2"
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  text: {
    fontSize: 12, // Equivalent to "text-xs"
  },
  error: {
    color: 'red',
  },
  alert: {
    color: 'blue',
  },
});
