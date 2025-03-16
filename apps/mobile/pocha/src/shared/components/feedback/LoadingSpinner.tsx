import React from 'react';
import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  label?: string;
}

export default function LoadingSpinner({
  fullScreen = false,
  label = '로딩중입니다',
}: LoadingSpinnerProps) {
  // Fullscreen spinner
  if (fullScreen) {
    return (
      <View style={styles.fullScreenContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        {label ? <Text style={styles.fullScreenLabel}>{label}</Text> : null}
      </View>
    );
  }
  // Inline spinner
  return (
    <View style={styles.inlineContainer}>
      <ActivityIndicator size="small" color="white" />
      {label ? <Text style={styles.inlineLabel}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  fullScreenLabel: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151', // gray-700
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  inlineLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
