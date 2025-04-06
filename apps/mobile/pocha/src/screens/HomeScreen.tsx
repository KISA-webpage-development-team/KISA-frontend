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
import {usePushNotifications} from '@/hooks/usePushNotifications';

interface HomeScreenProps {
  route: {params: {currentTab: 'MenuTab' | 'OrderTab'}};
}

export default function HomeScreen({route}: HomeScreenProps) {
  const {pochaInfo, status, error} = usePocha();
  usePushNotifications();

  const scrollY = useRef(new Animated.Value(0)).current;

  const currentTab = route?.params?.currentTab || 'MenuTab';

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [75, 0], // Adjust 80 to match your header height
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  if (status === 'loading') {
    return <LoadingSpinner fullScreen label="Loading..." />;
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
        currentTab={currentTab}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: '1%',
  },
});
