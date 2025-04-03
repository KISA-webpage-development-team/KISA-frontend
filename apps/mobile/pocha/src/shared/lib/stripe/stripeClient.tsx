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
  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLIC_KEY}
      merchantIdentifier="merchant.com.pocha">
      {children}
    </StripeProvider>
  );
}
