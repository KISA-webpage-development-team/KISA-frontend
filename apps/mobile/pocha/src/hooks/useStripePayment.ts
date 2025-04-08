// hooks/useStripePayment.ts
import {useEffect, useState} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {checkCartStock, notifyPayResult} from '@/apis/mutations.ts';
import {useMainNavigation} from '@/navigations/useMainNavigation';
import {Alert} from 'react-native';
import {
  create_customer,
  create_ephemeral_key,
  create_paymentIntent,
} from '@/apis/stripe';

const useStripePayment = (
  pochaID: number,
  totalPrice: number,
  userEmail: string,
  fullname: string,
  underAge: boolean,
  ageCheckRequired: boolean,
) => {
  const navigation = useMainNavigation();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const initializePaymentSheet = async () => {
    // Create customer
    const customer = await create_customer(userEmail, fullname);
    if (!customer?.id) throw new Error('고객 생성에 실패했습니다.');

    // Create ephemeral key
    const ephemeralKey = await create_ephemeral_key(customer.id);
    if (!ephemeralKey?.secret)
      throw new Error('Ephemeral key 생성에 실패했습니다.');

    // Create payment intent
    const paymentIntent = await create_paymentIntent(totalPrice, customer.id);
    if (!paymentIntent?.client_secret)
      throw new Error('PaymentIntent 생성에 실패했습니다.');

    // Initialize PaymentSheet
    const {error} = await initPaymentSheet({
      merchantDisplayName: 'UMich KISA',
      customerId: customer.id,
      customerEphemeralKeySecret: ephemeralKey.secret,
      paymentIntentClientSecret: paymentIntent.client_secret,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: fullname,
      },
      applePay: {
        merchantCountryCode: 'US',
      }
    });

    if (error) {
      throw new Error(`PaymentSheet 초기화 오류: ${error.message}`);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

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

  /** Main Submit Function */
  const handlePaymentSubmit = async () => {
    setLoading(true);
    try {
      // In React Native, card details should be collected by a CardField component.
      // We assume that if the CardField is rendered, the user has entered valid info.
      checkUserUnderAge();
      await checkCartInventory();
      // await initializePaymentSheet(); // -> openPaymentSheet
      // + notifyPayResult
      const {error} = await presentPaymentSheet();
      if (error) {
        throw new Error(error.message);
      }

      // Step 4: Notify backend of success
      const res = await notifyPayResult(userEmail, pochaID, {
        result: 'success',
      });
      if (!res) {
        throw new Error('Error while updating cart status');
      }

      // Navigate to success screen
      navigation.navigate('PaySuccessScreen');
    } catch (err) {
      const error = err as Error;
      Alert.alert(error.message ?? '결제 실패');
      setErrorMessage(error.message ?? '결제 실패');
      await notifyPayResult(userEmail, pochaID, {result: 'failure'});
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
