import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

// types
import {OrderStatus, OrderTabs} from '@/types/pocha';

const tabs = [
  'all',
  OrderStatus.PENDING,
  OrderStatus.PREPARING,
  OrderStatus.READY,
];

interface OrderStatusSelectorProps {
  activeTab: OrderTabs;
  setActiveTab: (tab: OrderTabs) => void;
}

export default function OrderStatusSelector({
  activeTab,
  setActiveTab,
}: OrderStatusSelectorProps) {
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
            onPress={() => setActiveTab(tab as OrderTabs)}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '4%',
  },
  tabBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    gap: '2%',
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  tabButton: {
    flex: 1,
    paddingVertical: '3%',
    borderRadius: 4,
    backgroundColor: '#E5E7EB', // gray background
  },
  activeTabButton: {
    backgroundColor: 'white',
  },
  tabText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Sejong-hospital-Bold',
  },
  activeTabText: {
    color: '#000',
    fontFamily: 'Sejong-hospital-Bold',
  },
});
