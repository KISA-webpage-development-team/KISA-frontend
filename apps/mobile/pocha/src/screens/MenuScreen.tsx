'use client';

// READ!
// TODO: N/A

// UNUSED IMPORT:
// import {useSearchParams, useRouter} from 'next/navigation';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
// import TipModal from "@/features/pocha/components/pay/TipModal";

import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MenuList from '../components/menu/MenuList';

export default function MenuScreenPage() {
  const pochaID = 123; // temporary for now

  return (
    <View style={styles.container}>
      <MenuList />
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
