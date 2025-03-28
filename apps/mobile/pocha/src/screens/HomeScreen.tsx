'use client';

import React, {useState} from 'react';

// ui components
import LoadingSpinner from '../shared/components/feedback/LoadingSpinner';
import HomeHeading from '@/components/home/HomeHeading';

// hooks
// import {useSearchParams} from 'next/navigation';
import usePocha from '../hooks/usePocha';

import {ActivityIndicator, SafeAreaView, StyleSheet, Text} from 'react-native';
import {BACKEND_URL} from '@env';

// navigations
import HomeTabNavigator from '@/navigations/HomeTabNavigator';

export default function HomeScreen() {
  const {pochaInfo, status, error} = usePocha();

  if (status === 'loading') {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (status === 'error') {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* PochaHeading (at the top, disappear when scrolling) */}
      {/* <div className="relative z-10 flex-shrink-0"> */}
      <HomeHeading pochaInfo={pochaInfo} />
      {/* </div> */}

      {/* Sticky Tabs (fixed at the top) */}
      {/* <div className="sticky top-0 z-50 bg-white"> */}
      {/* <HomeTabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      {/* </div> */}

      {/* Main Content Area (scrollable) */}
      {/* <div className="flex-1"> */}
      {/* <HomeTabContent activeTab={activeTab} pochaID={pochaInfo?.pochaID} /> */}
      {/* </div> */}
      <HomeTabNavigator pochaID={pochaInfo?.pochaID as number} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
