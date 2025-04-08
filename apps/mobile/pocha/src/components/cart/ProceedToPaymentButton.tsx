import React from 'react';
import {View} from 'react-native';
import PochaButton from '../shared/PochaButton';
import {useMainNavigation} from '@/navigations/useMainNavigation';

type PaymentProps = {
  pochaID: number;
  isLoading: boolean;
};

export default function ProceedToPaymentButton({
  pochaID,
  isLoading,
}: PaymentProps) {
  const navigation = useMainNavigation();

  const handlePaymentClick = () => {
    navigation.navigate('PayScreen', {pochaID});
  };

  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <PochaButton
        label="Checkout"
        onClick={handlePaymentClick}
        disabled={isLoading}
      />
    </View>
  );
}
