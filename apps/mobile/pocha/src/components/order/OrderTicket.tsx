import {OrderItem} from '../../types/pocha';
import React from 'react';
import {View} from 'react-native';
interface OrderTicketProps {
  orderItem: OrderItem;
}

export default function OrderTicket({orderItem}: OrderTicketProps) {
  return <View>OrderTicket</View>;
}
