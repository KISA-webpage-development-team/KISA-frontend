// import useUserOrderSocket from "../../hooks/useUserOrderSocket";
import React from 'react';
import {FlatList, Text, View, StyleSheet, Animated} from 'react-native';

// hooks
import useUserOrders from '@/hooks/useUserOrders';
import {useUser} from '@/contexts/UserContext';
import useUserToken from '@/hooks/useUserToken';

// ui components
import OrderListItem from '@/components/order/OrderListItem';
import ErrorDisplay from '@/shared/components/feedback/ErrorDisplay';
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner';

// types
import {OrderItem, OrderTabs} from '@/types/pocha';
import {SimpleUser} from '@/types/user';

interface OrderListProps {
  pochaID: number;
  activeTab: OrderTabs;
  setActiveTab: (tab: OrderTabs) => void;
  scrollY: Animated.Value;
}

export default function OrderList({
  pochaID,
  activeTab,
  setActiveTab,
  scrollY,
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
        <Animated.FlatList
          data={ordersToRender}
          keyExtractor={item => item.orderItemID.toString()}
          renderItem={({item}) => <OrderListItem orderItem={item} />}
          contentContainerStyle={styles.ordersListContent}
          style={styles.ordersList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}
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
  },
  ordersListContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingBottom: 24,
  },
  separator: {
    height: 8,
  },
  noOrdersText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Sejong-hospital-Bold',
  },
});
