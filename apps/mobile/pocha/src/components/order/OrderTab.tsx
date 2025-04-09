'use client';

// READ!
// TODO: N/A

// UNUSED IMPORT:
// import {useSearchParams, useRouter} from 'next/navigation';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
// import TipModal from "@/features/pocha/components/pay/TipModal";

import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import OrderList from '@/components/order/OrderList';
import {HomeTabProps} from '@/navigations/HomeTabNavigator';
import {useUser} from '@/contexts/UserContext';
import OrderStatusSelector from '@/components/order/OrderStatusSelector';

// types
import {OrderTabs} from '@/types/pocha';
import {deleteUser} from '@/apis/auth';
import {SimpleUser} from '@/types/user';

export default function OrderTab({route}: HomeTabProps) {
  const {signOut, user} = useUser();
  const loggedInUser = user as SimpleUser;

  const pochaID = route.params.pochaID;

  const scrollY = route.params.scrollY;

  const [activeTab, setActiveTab] = useState<OrderTabs>('all');

  return (
    <View style={styles.container}>
      <OrderStatusSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      <OrderList
        pochaID={pochaID}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        scrollY={scrollY}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteUser(loggedInUser.email)}>
          <Text style={styles.buttonText}>Delete User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '4%',
    rowGap: '2%',
  },
  buttonText: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});
