import React from 'react';
import {View} from 'react-native';
import PochaButton from '../shared/PochaButton';
// import {useNavigation} from '@react-navigation/native';

type PaymentProps = {
  pochaid: number;
};

export default function ProceedToPaymentButton({pochaid}: PaymentProps) {
  // const navigation = useNavigation();

  const handlePaymentClick = () => {
    // navigation.navigate('PochaPay', {pochaid});
  };

  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <PochaButton label="Checkout" onClick={handlePaymentClick} />
    </View>
  );
}
