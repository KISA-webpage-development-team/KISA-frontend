import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  label?: string;
}

export default function LoadingSpinner({
  fullScreen = false,
  label = '로딩중입니다',
}: LoadingSpinnerProps) {
  // [TODO]: Figure out the best way to extract this color setup
  const michiganBlue = '#00274C';
  const michiganLightBlue = '#003594';
  const michiganMaize = '#FFCB05';
  const michiganDarkMaize = '#e5b604';

  // Fullscreen spinner
  if (fullScreen) {
    return (
      <SafeAreaView style={styles.fullScreenContainer}>
        <ActivityIndicator size="large" color={michiganLightBlue} />
        {label ? (
          <Text style={[styles.fullScreenLabel, {color: michiganBlue}]}>
            {label}
          </Text>
        ) : null}
      </SafeAreaView>
    );
  }
  // Inline spinner
  return (
    <View style={styles.inlineContainer}>
      <ActivityIndicator size="small" color={michiganLightBlue} />
      {label ? (
        <Text style={[styles.inlineLabel, {color: michiganBlue}]}>{label}</Text>
      ) : null}
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
    marginTop: 16,
    fontSize: 18,
    fontFamily: 'Sejong-hospital-Bold',
  },
  inlineContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineLabel: {
    marginTop: 16,
    fontSize: 18,
    fontFamily: 'Sejong-hospital-Bold',
  },
});
