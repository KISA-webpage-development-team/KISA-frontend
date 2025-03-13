import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import CartListItem from '@/components/cart/CartListItem';
import {Cart} from '@/types/pocha';

interface CartListProps {
  cart: Object;
  fakeHandleQuantityChange: (menuid: number, newQuantity: number) => void;
}

export default function CartList({
  cart,
  fakeHandleQuantityChange,
}: CartListProps) {
  const cartEntries = Object.entries(cart);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartEntries}
        keyExtractor={([menuid]) => menuid}
        renderItem={({item}) => {
          const [menuid, cartItem] = item;
          return (
            <CartListItem
              key={menuid}
              menuid={parseInt(menuid)}
              item={cartItem}
              handleQuantityChange={fakeHandleQuantityChange}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});
