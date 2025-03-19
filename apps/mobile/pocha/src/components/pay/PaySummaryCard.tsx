import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

interface PaySummaryCardProps {
  amount: number;
  fee: number;
  totalPrice: number;
}

export default function PaySummaryCard({
  amount,
  fee,
  totalPrice,
}: PaySummaryCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>{amount}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Transaction Fee</Text>
        <Text style={styles.value}>${fee}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={[styles.label, styles.bold]}>Total</Text>
        <Text style={[styles.value, styles.bold]}>${totalPrice}</Text>
      </View>

      <Text style={styles.disclaimer}>
        *수수료는 Stripe 결제 서비스 비용이며, 고정 ($0.3)와 결제 금액의 3.1%를
        합산하여 계산됩니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  value: {
    fontSize: 16,
  },
  divider: {
    height: 2,
    backgroundColor: 'lightgray',
    marginVertical: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    color: 'gray',
    marginTop: 8,
  },
});
