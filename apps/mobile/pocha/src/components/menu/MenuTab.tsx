'use client';

// READ!
// TODO: N/A

// UNUSED IMPORT:
// import {useSearchParams, useRouter} from 'next/navigation';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
// import TipModal from "@/features/pocha/components/pay/TipModal";

import React, {useEffect} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import MenuList from '@/components/menu/MenuList';
import {HomeTabProps} from '@/navigations/HomeTabNavigator';
import useMenu from '@/hooks/useMenu';
import {useUser} from '@/contexts/UserContext';

export default function MenuTab({route}: HomeTabProps) {
  // Example of using the logged in user (this is same type as the "session" from the web)
  const {user} = useUser();
  const pochaID = route.params.pochaID;

  const {menuList, status: menuStatus, error} = useMenu(pochaID);

  if (menuStatus === 'loading') {
    return <ActivityIndicator size="large" />;
  }

  if (menuStatus === 'error') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>{pochaID}</Text>
      <MenuList menuList={menuList} />
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
