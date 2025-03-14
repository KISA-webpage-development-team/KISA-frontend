import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CartTotalSummaryProps {
  totalAmount: number;
}

export default function CartTotalSummary({totalAmount}: CartTotalSummaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total</Text>
      <Text style={styles.text}>${totalAmount.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 16,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
});
