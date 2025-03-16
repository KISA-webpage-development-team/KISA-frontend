import React from 'react';
import {View} from 'react-native';
import PochaButton from '../shared/PochaButton';
import {useMainNavigation} from '@/navigations/useMainNavigation';

type PaymentProps = {
  pochaid: number;
};

export default function ProceedToPaymentButton({pochaid}: PaymentProps) {
  const navigation = useMainNavigation();

  const handlePaymentClick = () => {
    navigation.navigate('PayScreen', {pochaid});
  };

  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <PochaButton label="Checkout" onClick={handlePaymentClick} />
    </View>
  );
}
