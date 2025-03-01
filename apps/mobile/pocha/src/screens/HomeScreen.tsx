'use client';

import React, {useState} from 'react';

// ui components
import LoadingSpinner from '../shared/components/LoadingSpinner';
import HomeHeading from '../components/home/HomeHeading';
import HomeTabs from '../components/home/HomeTabs';
import HomeTabContent from '../components/home/HomeTabContent';

// hooks
// import {useSearchParams} from 'next/navigation';
import usePocha from '../hooks/usePocha';

// types
import {PochaTab} from '../types/pocha';
// import {sejongHospitalBold} from '../utils/fonts/textFonts';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export default function HomeScreen() {
  const pochaInfo = {
    pochaID: 1,
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
    title: 'Halloween Pocha',
    description: 'dasfdfasdf',
    ongoing: true,
  };
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'pink',
  },
});
