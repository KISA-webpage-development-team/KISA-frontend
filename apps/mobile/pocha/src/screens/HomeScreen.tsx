'use client';

import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Animated} from 'react-native';

// ui components
import HomeHeading from '@/components/home/HomeHeading';
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner';
import ErrorDisplay from '@/shared/components/feedback/ErrorDisplay';

// navigations
import HomeTabNavigator from '@/navigations/HomeTabNavigator';

// hooks
import usePocha from '../hooks/usePocha';

export default function HomeScreen() {
  const {pochaInfo, status, error} = usePocha();

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [95, 0], // Adjust 80 to match your header height
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  if (status === 'loading') {
    return <LoadingSpinner fullScreen label="로딩 중입니다..." />;
  }

  if (status === 'error') {
    return <ErrorDisplay fullScreen state="error" message={error} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{height: headerHeight, opacity: headerOpacity}}>
        <HomeHeading pochaInfo={pochaInfo} />
      </Animated.View>
      <HomeTabNavigator
        pochaID={pochaInfo?.pochaID as number}
        scrollY={scrollY}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
