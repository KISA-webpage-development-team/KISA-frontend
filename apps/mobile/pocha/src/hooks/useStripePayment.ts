// hooks/useStripePayment.ts
import { useState } from "react";
import {useStripe} from '@stripe/stripe-react-native';
import { checkCartStock, notifyPayResult } from "@/apis/mutations.ts";
import {useMainNavigation} from '@/navigations/useMainNavigation';
import { Alert } from 'react-native';
import { create_customer, create_paymentIntent } from '@/apis/stripe';
const useStripePayment = (
  pochaID: number,
  totalPrice: number,
  userEmail: string,
  fullname: string,
  underAge: boolean,
  ageCheckRequired: boolean,
) => {
  const {confirmPayment} = useStripe();
  const navigation = useMainNavigation();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  /** Step 1: Check User Age */
  const checkUserUnderAge = () => {
    if (ageCheckRequired && underAge) {
      throw new Error('미성년자는 주류를 주문할 수 없습니다.');
    }
  };

  /** Step 2: Check Inventory */
  const checkCartInventory = async () => {
    try {
      const res = await checkCartStock(userEmail, pochaID);
      if (!res?.isStocked) {
        throw new Error('재고가 부족합니다.');
      }
    } catch (error) {
      throw new Error('Error while checking inventory.');
    }
  };

  /** Step 3: Process Payment */
  const processPayment = async () => {
    try {
      // Step 3.1: Create or verify customer
      const customerResponse = create_customer(userEmail, fullname);

      const { customerID } = await customerResponse;
      if (!customerID) throw new Error('고객 생성에 실패했습니다.');

      // Step 3.2: Create a PaymentIntent including the customer ID
      const createPaymentIntentResponse = create_paymentIntent(totalPrice * 100, customerID);
      const { clientSecret } = await createPaymentIntentResponse;
      if (!clientSecret) throw new Error('PaymentIntent 생성에 실패했습니다.');

      // Step 3.3: Confirm the payment using Stripe's native confirmPayment call.
      // This call uses the card details entered via the CardField component.
      const {error, paymentIntent} = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            email: userEmail,
            name: fullname,
          },
        },
      });

      if (error) {
        console.error('Error while confirming payment:', error);
        setErrorMessage(error.message);
        throw new Error(error.message);
      }

      // Step 3.4: Notify your backend of the successful payment
      const res = await notifyPayResult(userEmail, pochaID, {
        result: 'success',
      });
      if (!res) {
        throw new Error('Error while updating cart status');
      }

      // (Optional) Save payment-related data locally.
      // For React Native, you can use AsyncStorage if needed.
      // await AsyncStorage.setItem("paymentMethodId", paymentIntent.payment_method as string);
      // await AsyncStorage.setItem("customerName", fullname);
      // await AsyncStorage.setItem("customerEmail", userEmail);
      // await AsyncStorage.setItem("customerID", customerID);

      Alert.alert('결제가 완료되었습니다.');
      // Navigate to the success screen.
      navigation.navigate('PaySuccessScreen');
    } catch (err) {
      const error = err as Error;
      Alert.alert('결제 오류가 발생했습니다. 카드 정보를 확인해주세요', error.message ?? '결제 실패');
      setErrorMessage(error.message ?? '결제 실패');
    
      // Notify your backend of the failure.
      const res = await notifyPayResult(userEmail, pochaID, {
        result: 'failure',
      });
      if (!res) {
        throw new Error('Error while updating cart status');
      }
    }
  };

  /** Main Submit Function */
  const handlePaymentSubmit = async () => {
    setLoading(true);
    try {
      // In React Native, card details should be collected by a CardField component.
      // We assume that if the CardField is rendered, the user has entered valid info.
      checkUserUnderAge();
      await checkCartInventory();
      await processPayment();
    } catch (err) {
      const error = err as Error;
      Alert.alert('Payment failed: ', error.message ?? "결제 실패");
      setErrorMessage(error.message ?? '결제 실패');
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePaymentSubmit,
    loading,
    errorMessage,
  };
};


export default useStripePayment;
