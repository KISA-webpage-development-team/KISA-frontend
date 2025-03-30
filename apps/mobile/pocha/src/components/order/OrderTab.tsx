'use client';

// READ!
// TODO: N/A

// UNUSED IMPORT:
// import {useSearchParams, useRouter} from 'next/navigation';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
// import TipModal from "@/features/pocha/components/pay/TipModal";

import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import OrderList from '@/components/order/OrderList';
import {HomeTabProps} from '@/navigations/HomeTabNavigator';
import {useUser} from '@/contexts/UserContext';
import {getToken} from '@/shared/lib/react-native-keychain/keychain';
import {UserCredentials} from 'react-native-keychain';
import useUserToken from '@/hooks/useUserToken';

export default function OrderTab({route}: HomeTabProps) {
  const {user} = useUser();
  const pochaID = route.params.pochaID;
  const {token, status: tokenStatus, error: tokenError} = useUserToken();

  if (!user || !token) {
    return null;
  }

  return (
    <View style={styles.container}>
      <OrderList pochaID={pochaID} email={user.email} token={token} />
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
