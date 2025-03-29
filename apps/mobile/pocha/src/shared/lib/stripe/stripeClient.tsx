import React, {ReactElement} from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
import {STRIPE_PUBLIC_KEY} from '@env';

if (!STRIPE_PUBLIC_KEY) {
  throw new Error('Stripe publishable key is not set');
}

type StripeProviderWrapperProps = {
  children: ReactElement | ReactElement[];
};

export default function StripeProviderWrapper({
  children,
}: StripeProviderWrapperProps) {
  // TODO: add merchantIdentifier for Apple Pay
  // https://docs.stripe.com/apple-pay?platform=react-native
  return (
    <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
      {children}
    </StripeProvider>
  );
}
