import React from 'react';
import {View, StyleSheet} from 'react-native';
import PaySummaryCard from '@/components/pay/PaySummaryCard';
import PayButton from '@/components/pay/PayButton';
import { useMainNavigation } from '@/navigations/useMainNavigation';
import PaymentSubmitForm from '@/components/pay/PaymentSubmitForm';
import { StripeProvider } from '@stripe/stripe-react-native';
import StripeProviderWrapper from '@/shared/lib/axios/stripe/stripeClient';
export default function PayScreen() {

  const navigation = useMainNavigation();

  // const amount = 500;
  // const fee = 10;
  // const totalPrice = 50.25;
const amount = 500;
const fee = 10;
const totalPrice = 50.25;
const pochaID = 1; // example ID
const ageCheckRequired = false;
const userEmail = 'user@example.com';
const underAge = false;
const fullname = 'John Doe';

  const handlePayPress = () => {
    console.log('Click!');

    navigation.navigate('PaySuccessScreen');
  };

  return (
    <StripeProviderWrapper>
      <View style={styles.container}>
        <PaymentSubmitForm
          amount={amount}
          fee={fee}
          totalPrice={totalPrice}
          pochaID={pochaID}
          ageCheckRequired={ageCheckRequired}
          userEmail={userEmail}
          underAge={underAge}
          fullname={fullname}
        />
      </View>
    </StripeProviderWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});