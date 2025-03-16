'use client';

import React from 'react';

// UI
import PochaBackHeading from '@/components/shared/PochaBackHeading';
import EmptyCartAlert from '@/components/cart/EmptyCartAlert';
import CartList from '@/components/cart/CartList';
import CartTotalSummary from '@/components/cart/CartTotalSummary';
import ProceedToPaymentButton from '@/components/cart/ProceedToPaymentButton';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

// hooks
import {useState} from 'react';

// types
import {Cart} from '@/types/pocha';

// import usePochaID from '@/hooks/usePochaID';
// import useCart from '@/hooks/useCart';

export default function CartScreen() {
  const fakeCart = {
    3: {
      menu: {
        menuID: 3,
        nameKor: '치킨',
        nameEng: 'Chicken',
        price: 30.0,
        stock: 300,
        isImmediatePrep: false,
        parentPochaId: 1,
        ageCheckRequired: false,
      },
      quantity: 1,
    },
    1: {
      menu: {
        menuID: 1,
        nameKor: '맥주',
        nameEng: 'Beer',
        price: 15.0,
        stock: 100,
        isImmediatePrep: false,
        parentPochaId: 1,
        ageCheckRequired: true,
      },
      quantity: 2,
    },
    2: {
      menu: {
        menuID: 2,
        nameKor: '소주',
        nameEng: 'Soju',
        price: 10.0,
        stock: 200,
        isImmediatePrep: true,
        parentPochaId: 1,
        ageCheckRequired: true,
      },
      quantity: 3,
    },
  };
  const [fakeStateCart, setCart] = useState<Cart>(fakeCart as unknown as Cart);

  // const { data: session, status: sessionStatus } = useSession() as {
  //   data: UserSession | undefined;
  //   status: string;
  // };

  // // get pochaID from URL or API to use in cart
  // const { pochaID, status: pochaIDStatus, error: pochaIDError } = usePochaID();
  const fakePochaID = 3;

  const fakeHandleQuantityChange = (menuid: number, newQuantity: number) => {};

  return (
    <SafeAreaView style={styles.container}>
      <PochaBackHeading title="Cart" />
      <View style={styles.divider}></View>
      {Object.keys(fakeCart).length === 0 ? (
        <EmptyCartAlert />
      ) : (
        <>
          <View style={styles.cartListContainer}>
            <CartList
              cart={fakeCart}
              fakeHandleQuantityChange={fakeHandleQuantityChange}
            />
          </View>
          <View style={styles.stickyFooter}>
            <View style={styles.divider}></View>
            <View style={styles.infoView}>
              <CartTotalSummary totalAmount={10} />
              <ProceedToPaymentButton pochaid={fakePochaID} />
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
