'use client';

import React from 'react';
import {useUser} from '@/contexts/UserContext';
// UI
import EmptyCartAlert from '@/components/cart/EmptyCartAlert';
import CartList from '@/components/cart/CartList';
import CartTotalSummary from '@/components/cart/CartTotalSummary';
import ProceedToPaymentButton from '@/components/cart/ProceedToPaymentButton';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner';

// hooks
import {useState} from 'react';

// types
import {Cart} from '@/types/pocha';
import {MainStackParam} from '@/navigations/useMainNavigation';
import useCart from '@/hooks/useCart';

// [NOTE] this is how to use TS with navigation props
type CartScreenProps = {
  route: {params: {pochaID: number}};
};

export default function CartScreen({route}: CartScreenProps) {
  const {user} = useUser();

  // pochaID is passed from the menu tab
  const pochaID = route.params.pochaID;

  if (!user) {
    return null;
  }

  const {
    cart,
    status: cartStatus,
    error: cartError,
    totalAmount,
    handleQuantityChange,
  } = useCart(user.email, pochaID);

  if (cartStatus === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.divider} />
      {Object.keys(cart ?? {}).length === 0 ? (
        <EmptyCartAlert />
      ) : (
        <>
          <View style={styles.cartListContainer}>
            <CartList cart={cart} handleQuantityChange={handleQuantityChange} />
          </View>
          <View style={styles.stickyFooter}>
            <View style={styles.divider}></View>
            <View style={styles.infoView}>
              <CartTotalSummary totalAmount={totalAmount} />
              <ProceedToPaymentButton pochaID={pochaID} />
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    minHeight: '100%',
    gap: 0,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#CACACA',
    width: '100%',
    marginHorizontal: 'auto',
  },
  cartListContainer: {
    flexGrow: 1,
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
  infoView: {
    paddingHorizontal: 16,
  },
});
