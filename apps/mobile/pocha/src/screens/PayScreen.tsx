import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import PaySummaryCard from '@/components/pay/PaySummaryCard';
import PayButton from '@/components/pay/PayButton';
import {useMainNavigation} from '@/navigations/useMainNavigation';
import PaymentSubmitForm from '@/components/pay/PaymentSubmitForm';
import {StripeProvider} from '@stripe/stripe-react-native';
import StripeProviderWrapper from '@/shared/lib/stripe/stripeClient';
import {SimpleUser} from '@/types/user';

// hooks
import {useUser} from '@/contexts/UserContext';
import usePochaID from '@/hooks/usePochaID';
import usePayInfo from '@/hooks/usePayInfo';
import useUserAge from '@/hooks/useUserAge';

export default function PayScreen() {
  const navigation = useMainNavigation();

  // Get logged in user
  const {user} = useUser();
  const loggedInUser = user as SimpleUser;

  const {pochaID, status: pochaIDStatus, error: pochaIDError} = usePochaID();

  const {
    amount,
    fee,
    totalPrice,
    ageCheckRequired,
    status: payInfoStatus,
    error: payInfoError,
  } = usePayInfo(loggedInUser.email, pochaID);

  // TODO: remove fake token
  // const {
  //   underAge,
  //   status: userAgeStatus,
  //   fullname,
  //   error: userAgeError,
  // } = useUserAge(loggedInUser.email, 'fake_token');

  const isLoading = pochaIDStatus === 'loading' || payInfoStatus === 'loading';
  // userAgeStatus === 'loading';

  const isError = pochaIDError || payInfoError || !totalPrice;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Error</Text>
      </View>
    );
  }

  if (!amount || !fee || !totalPrice || !pochaID) {
    return <></>;
  }
  return (
    <StripeProviderWrapper>
      <View style={styles.container}>
        <PaymentSubmitForm
          amount={amount}
          fee={fee}
          totalPrice={totalPrice}
          pochaID={pochaID}
          ageCheckRequired={ageCheckRequired}
          userEmail={loggedInUser.email}
          underAge={false}
          fullname={loggedInUser.fullname}
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

const members = [
  '임수빈,',
  'Gayson Gay Park',
  '강수민',
  '나윤성!!',
  '함리아',
  '인지오?',
  '한준희?',
];
