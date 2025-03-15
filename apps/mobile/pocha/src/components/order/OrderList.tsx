// import React from "react";
// import { sejongHospitalBold } from "@/utils/fonts/textFonts";
// import useUserOrders from "../../hooks/useUserOrders";
// import { useSession } from "next-auth/react";

// import { UserSession } from "@/lib/next-auth/types";
// import PochaOrderItem from "./PochaOrderItem";
// import { Tabs, Tab } from "@nextui-org/react"; // Using Tabs
// import useUserOrderSocket from "../../hooks/useUserOrderSocket";
// import LoadingSpinner from "@/final_refactor_src/components/feedback/LoadingSpinner";
import React, {useState} from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import PochaOrderItem from './PochaOrderItem';
import { OrderStatus } from '../../types/pocha';
import { OrderItem } from '../../types/pocha';
// interface OrderListProps {
//   pochaID: number;
// }

const pendingOrders: OrderItem[] = [
  {
    orderItemID: 1,
    status: OrderStatus.PENDING,
    menu: {
      menuID: 101,
      nameKor: '김치찌개',
      nameEng: 'Kimchi Stew',
      price: 10,
      stock: 100,
      isImmediatePrep: false,
      parentPochaId: 20,
      ageCheckRequired: false,
    },
    quantity: 1,
    ordererName: 'Alice',
    ordererEmail: 'alice@example.com',
  },
];
// menuID: number;
// nameKor: string;
// nameEng: string;
// price: number;
// stock: number;
// isImmediatePrep: boolean;
// parentPochaId: number;
// ageCheckRequired: boolean;
const preparingOrders: OrderItem[] = [
  {
    orderItemID: 2,
    status: OrderStatus.PREPARING,
    menu: {
      menuID: 102,
      nameKor: '해물파전',
      nameEng: 'Seafood Pancake',
      price: 12,
      stock: 100,
      isImmediatePrep: false,
      parentPochaId: 21,
      ageCheckRequired: false,
    },
    quantity: 2,
    ordererName: 'Bob',
    ordererEmail: 'bob@example.com',
  },
];

const readyOrders: OrderItem[] = [
  {
    orderItemID: 3,
    status: OrderStatus.READY,
    menu: {
      menuID: 103,
      nameKor: '육회',
      nameEng: 'Beef Tartare',
      price: 15,
      stock: 100,
      isImmediatePrep: false,
      parentPochaId: 22,
      ageCheckRequired: false,
    },
    quantity: 1,
    ordererName: 'Charlie',
    ordererEmail: 'charlie@example.com',
  },
];

const closedOrders: OrderItem[] = [
  {
    orderItemID: 4,
    status: OrderStatus.CLOSED,
    menu: {
      menuID: 104,
      nameKor: '불고기',
      nameEng: 'Bulgogi',
      price: 20,
      stock: 100,
      isImmediatePrep: false,
      parentPochaId: 23,
      ageCheckRequired: false,
    },
    quantity: 1,
    ordererName: 'Dave',
    ordererEmail: 'dave@example.com',
  },
];

const tabs = ['all', 'pending', 'preparing', 'ready'];

//export default function OrderList({ pochaID }: OrderListProps) {
//   const { data: session, status: sessionStatus } = useSession() as {
//     data: UserSession | undefined;
//     status: string;
//   };

//   const {
//     updateOrder,
//     addNewOrderItem,
//     pendingOrders,
//     preparingOrders,
//     readyOrders,
//     closedOrders,
//     status: ordersStatus,
//   } = useUserOrders(session?.user?.email, session?.token, pochaID);

//   useUserOrderSocket({
//     token: session?.token,
//     email: session?.user?.email,
//     pochaID,
//     updateOrder,
//     addNewOrderItem,
//   });

//   // UI Rendering ----------------------------------------------
//   if (sessionStatus === "loading" || ordersStatus === "loading") {
//     return (
//       <LoadingSpinner fullScreen={false} label="주문 목록 가져오는중..." />
//     );
//   }

export default function OrderList() {
  const [activeTab, setActiveTab] = useState<string>('all');
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
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {ordersToRender.length === 0 ? (
        <Text style={styles.noOrdersText}>
          You haven't placed any orders yet.
        </Text>
      ) : (
        <FlatList
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
    padding: 16,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#E5E7EB', // gray background
  },
  activeTabButton: {
    backgroundColor: '#DCFCE7', // light green for active tab
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  ordersList: {
    paddingBottom: 16,
  },
  noOrdersText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
});
