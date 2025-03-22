import {View} from 'react-native';
import React from 'react';
import PaySummaryCard from '@/components/pay/PaySummaryCard';
import PayButton from '@/components/pay/PayButton';

export default function PayScreen() {

  const amount = 500;
  const fee = 10;
  const totalPrice = 50.25;

  const handlePayPress = () => {
    console.log('Click!');
  };

  return (
    <View>
      {/* [TODO] PaymentSubmitForm will go here... */}
      <PaySummaryCard amount={amount} fee={fee} totalPrice={totalPrice}/>
      <PayButton loading={false} totalPrice={totalPrice} onPress={handlePayPress}/>
    </View>
  );
}
