// PaymentSubmitForm.tsx

// [UI]
// - PaymentElement from Stripe (built-in component)
// - Total Price + Transaction Fee Display
// - Submit Button

// [NOTE] I wanted to make a separate component only for the form.
// However, built-in PaymentElement component requires submit button to be included in the form to display error msgs

import React from 'react';
import {View, StyleSheet} from 'react-native';

// hooks
import useStripePayment from '../../hooks/useStripePayment';
import PayButton from './PayButton';

interface PaymentSubmitFormProps {
  totalPrice: number;
  pochaID: number;
  ageCheckRequired: boolean;
  userEmail: string;
  underAge: boolean;
  fullname: string;
}

export default function PaymentSubmitForm({
  totalPrice,
  pochaID,
  ageCheckRequired,
  userEmail,
  underAge,
  fullname,
}: PaymentSubmitFormProps) {
  const {handlePaymentSubmit, loading: paymentLoading} = useStripePayment(
    pochaID,
    totalPrice,
    userEmail,
    fullname,
    underAge,
    ageCheckRequired,
  );

  // [NOTE] form itself is not included, but handled by Stripe
  // so the form logic aggregation is here.
  return (
    <View style={styles.container}>
      <PayButton
        loading={paymentLoading}
        totalPrice={totalPrice}
        onPress={handlePaymentSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    height: 50,
    marginVertical: 20,
  },
  errorText: {
    marginTop: 8,
    color: 'red',
    fontSize: 14,
  },
});
