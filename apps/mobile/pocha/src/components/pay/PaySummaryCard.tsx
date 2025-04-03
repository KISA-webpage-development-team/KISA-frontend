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
        <Text style={styles.value}>${amount}</Text>
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
        *The fee is the cost of the Stripe payment service, which includes a
        fixed fee of $0.3 and 3.1% of the payment amount.
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
    marginBottom: 16,
    fontFamily: 'sejong-hospital-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    fontFamily: 'sejong-hospital-Light',
  },

  label: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'sejong-hospital-Light',
  },
  value: {
    fontSize: 16,
    fontFamily: 'sejong-hospital-Light',
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
    fontSize: 10,
    color: 'gray',
    marginTop: 8,
    fontFamily: 'sejong-Hospital-Bold',
  },
});
