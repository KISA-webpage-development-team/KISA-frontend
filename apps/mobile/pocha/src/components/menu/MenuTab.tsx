'use client';

// READ!
// TODO: N/A

// UNUSED IMPORT:
// import {useSearchParams, useRouter} from 'next/navigation';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
// import TipModal from "@/features/pocha/components/pay/TipModal";

import React from 'react';
import {View, StyleSheet} from 'react-native';

// ui components
import MenuList from '@/components/menu/MenuList';
import ViewCartButton from '@/components/menu/ViewCartButton';

// types
import {HomeTabProps} from '@/navigations/HomeTabNavigator';

export default function MenuTab({route}: HomeTabProps) {
  const pochaID = route.params.pochaID;
  const scrollY = route.params.scrollY; // for fancy scroll animation

  return (
    <View style={styles.container}>
      <MenuList pochaID={pochaID} scrollY={scrollY} />
      <ViewCartButton pochaID={pochaID} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 24,
  },
});
