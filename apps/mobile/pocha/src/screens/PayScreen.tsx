import React from 'react';
import {View, StyleSheet} from 'react-native';
import StripeProviderWrapper from '@/shared/lib/stripe/stripeClient';

// ui components
import PaymentSubmitForm from '@/components/pay/PaymentSubmitForm';
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner';
import ErrorDisplay from '@/shared/components/feedback/ErrorDisplay';
import PaySummaryCard from '@/components/pay/PaySummaryCard';

// hooks
import {useUser} from '@/contexts/UserContext';
import usePayInfo from '@/hooks/usePayInfo';
import useUserAge from '@/hooks/useUserAge';
import useUserToken from '@/hooks/useUserToken';

// types
import {SimpleUser} from '@/types/user';

type PochaScreenProps = {
  route: {params: {pochaID: number}};
};

export default function PayScreen({route}: PochaScreenProps) {
  // Get logged in user & token
  const {user} = useUser();
  const loggedInUser = user as SimpleUser;
  const {token, status: tokenStatus, error: tokenError} = useUserToken();

  const pochaID = route.params.pochaID;

  const {
    amount,
    fee,
    totalPrice,
    ageCheckRequired,
    status: payInfoStatus,
    error: payInfoError,
  } = usePayInfo(loggedInUser.email, pochaID);

  const {
    underAge,
    status: userAgeStatus,
    fullname,
    error: userAgeError,
  } = useUserAge(loggedInUser.email, token);

  const isLoading = payInfoStatus === 'loading' || userAgeStatus === 'loading';

  const isError = payInfoError || userAgeError || !totalPrice;

  // wait until it gets the token
  if (tokenStatus === 'loading') {
    return <LoadingSpinner fullScreen={true} />;
  }

  // if the token is being retrieved after wait, return tokenError.
  if (tokenError) {
    return <ErrorDisplay fullScreen state="error" message={tokenError} />;
  }

  // handling pay info fetch status
  if (isLoading) {
    <LoadingSpinner fullScreen={false} label="결제 정보를 가져오는 중..." />;
  }

  if (isError) {
    <ErrorDisplay
      fullScreen
      state="error"
      message="결제 정보를 가져오는데 실패했습니다."
    />;
  }

  // for type safety
  if (!amount || !fee || !totalPrice || !pochaID) {
    return <></>;
  }

  return (
    <StripeProviderWrapper>
      <View style={styles.container}>
        <PaySummaryCard amount={amount} fee={fee} totalPrice={totalPrice} />
        <View style={styles.stickyFooter}>
          <PaymentSubmitForm
            totalPrice={totalPrice}
            pochaID={pochaID}
            ageCheckRequired={ageCheckRequired}
            userEmail={loggedInUser.email}
            underAge={underAge}
            fullname={loggedInUser.fullname}
          />
        </View>
      </View>
    </StripeProviderWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    paddingBottom: 40,
    gap: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
