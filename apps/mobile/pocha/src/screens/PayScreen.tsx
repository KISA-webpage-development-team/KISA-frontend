import {View} from 'react-native';
import React from 'react';
import PaySummaryCard from '@/components/pay/PaySummaryCard';
import PayButton from '@/components/pay/PayButton';

export default function PayScreen() {
  return (
    <View>
      {/* [TODO] PaymentSubmitForm will go here... */}
      <PaySummaryCard />
      <PayButton />
    </View>
  );
}
