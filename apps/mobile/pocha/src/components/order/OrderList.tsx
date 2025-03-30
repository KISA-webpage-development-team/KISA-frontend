// import React from "react";
// import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import useUserOrders from '../../hooks/useUserOrders';
// import { useSession } from "next-auth/react";

// import { UserSession } from "@/lib/next-auth/types";
// import PochaOrderItem from "./PochaOrderItem";
// import { Tabs, Tab } from "@nextui-org/react"; // Using Tabs
// import useUserOrderSocket from "../../hooks/useUserOrderSocket";
import React, {useState} from 'react';
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import PochaOrderItem from './PochaOrderItem';
import ErrorDisplay from '@/shared/components/feedback/ErrorDisplay';
import {useUser} from '@/contexts/UserContext';
import useUserToken from '@/hooks/useUserToken';

// types
import {OrderItem, OrderTabs} from '@/types/pocha';
import {SimpleUser} from '@/types/user';

// interface OrderListProps {
//   pochaID: number;
// }

// menuID: number;
// nameKor: string;
// nameEng: string;
// price: number;
// stock: number;
// isImmediatePrep: boolean;
// parentPochaId: number;
// ageCheckRequired: boolean;

const tabs = ['all', 'pending', 'preparing', 'ready'];

interface OrderListProps {
  pochaID: number;
  activeTab: OrderTabs;
  setActiveTab: (tab: OrderTabs) => void;
}

export default function OrderList({
  pochaID,
  activeTab,
  setActiveTab,
}: OrderListProps) {
  // Get user from firebase context
  const {user} = useUser();
  const loggedInUser = user as SimpleUser;
  const {token, status: tokenStatus, error: tokenError} = useUserToken();

  const {
    updateOrder,
    addNewOrderItem,
    pendingOrders,
    preparingOrders,
    readyOrders,
    closedOrders,
    status: ordersStatus,
  } = useUserOrders(loggedInUser.email, token, pochaID);

  // useUserOrderSocket({
  //   token: session?.token,
  //   email: session?.user?.email,
  //   pochaID,
  //   updateOrder,
  //   addNewOrderItem,

  // UI Rendering ----------------------------------------------
  // if (sessionStatus === "loading" || ordersStatus === "loading") {

  let ordersToRender: OrderItem[] = [];
  if (activeTab === 'all') {
    ordersToRender = [
      ...readyOrders,
      ...preparingOrders,
      ...pendingOrders,
      ...closedOrders,
    ];
  } else if (activeTab === 'pending') {
    ordersToRender = pendingOrders;
  } else if (activeTab === 'preparing') {
    ordersToRender = preparingOrders;
  } else if (activeTab === 'ready') {
    ordersToRender = readyOrders;
  }

  if (ordersStatus === 'loading') {
    return (
      <LoadingSpinner fullScreen={false} label="주문 목록 가져오는중..." />
    );
  }

  if (ordersStatus === 'error') {
    return (
      <ErrorDisplay
        fullScreen
        state="error"
        message={'주문 목록 가져오는데 실패했습니다.'}
      />
    );
  }

  return (
    <View style={styles.container}>
      {ordersToRender?.length === 0 ? (
        <Text style={styles.noOrdersText}>
          You haven't placed any orders yet.
        </Text>
      ) : (
        <FlatList
          style={styles.ordersList}
          data={ordersToRender}
          keyExtractor={item => item.orderItemID.toString()}
          renderItem={({item}) => <PochaOrderItem orderItem={item} />}
          contentContainerStyle={styles.ordersList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  ordersList: {
    width: '100%',
    paddingBottom: 16,
    paddingHorizontal: '2%',
  },
  noOrdersText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Sejong-hospital-Bold',
  },
});
