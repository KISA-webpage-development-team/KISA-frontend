// PaymentSubmitForm.tsx

// [UI]
// - PaymentElement from Stripe (built-in component)
// - Total Price + Transaction Fee Display
// - Submit Button

// [NOTE] I wanted to make a separate component only for the form.
// However, built-in PaymentElement component requires submit button to be included in the form to display error msgs

import React, {useState} from 'react';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { View, Text, StyleSheet } from 'react-native';
// import convertToSubcurrency from '@/lib/stripe/convertToSubcurrency';
//import {useRouter} from 'next/navigation';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
import PaySummaryCard from './PaySummaryCard';
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner';
import { useMainNavigation } from '@/navigations/useMainNavigation';

// hooks
import useStripePayment from '../../hooks/useStripePayment';
import PayButton from './PayButton';

interface PaymentSubmitFormProps {
  amount: number;
  fee: number;
  totalPrice: number;
  pochaID: number;
  ageCheckRequired: boolean;
  userEmail: string;
  underAge: boolean;
  fullname: string;
}
 
export default function PaymentSubmitForm({
  amount,
  fee,
  totalPrice,
  pochaID,
  ageCheckRequired,
  userEmail,
  underAge,
  fullname,
}: PaymentSubmitFormProps) {
  // [NOTE] useStripe and useElements should be called inside <Elements> wrapper
  const stripe = useStripe();
  //const elements = useElements();

  const navigation = useMainNavigation();

  const handlePayPress = () => {
    console.log('Click!');
    navigation.navigate('PaySuccessScreen');
  };

  const {
    handlePaymentSubmit,
    loading: paymentLoading,
    errorMessage,
  } = useStripePayment(
    // pochaID,
    // totalPrice,
    // userEmail,
    // fullname,
    // underAge,
      // ageCheckRequired,
    1, 
    50.25, 
    'test@example.com', 
    'Test User', 
    false,
    false,
  );

  // useEffect(() => {
  //   const createPaymentIntent = async () => {
  //     // fetch client secret from server
  //     fetch("/api/create-payment-intent", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         amount: convertToSubcurrency(totalPrice),
  //         customer: {
  //           email: userEmail,
  //           name: fullname,
  //         },
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setClientSecret(data.clientSecret);
  //       });
  //   };

  //   if (userEmail && fullname && totalPrice) {
  //     if (!clientSecret) {
  //     createPaymentIntent();
  //     }
  //   }
  // }, [totalPrice, userEmail, fullname, clientSecret]);

  // if (!clientSecret || !stripe || !elements) {

  {/*stripe specific style */}
  const cardFieldStyles = {
    backgroundColor: '#efefef',
     textColor: '#424242', // Allowed by Stripe's CardField, but not by React Native's StyleSheet
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  };
  if (!stripe) {
    return (
      <LoadingSpinner fullScreen={false} label="결제 정보를 가져오는 중..." />
    );
  }

  return (
    <View style={styles.container}>
      {/* CardField is the React Native equivalent of a card input field */}
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={cardFieldStyles}
        style={styles.cardContainer}
        //onCardChange={cardDetails => { }}
      />
      {/* )} */}
      {/*?*/}
      {/* Total Price + Transaction fee display */}
      <PaySummaryCard amount={amount} fee={fee} totalPrice={totalPrice} />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Submit button (sticky on the bottom) */}
      <PayButton loading={paymentLoading} totalPrice={totalPrice} onPress={handlePaymentSubmit}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
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