import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import CartListItem from '@/components/cart/CartListItem';
import {Cart} from '@/types/pocha';

interface CartListProps {
  cart: Cart | undefined;
  handleQuantityChange: (menuid: number, newQuantity: number) => void;
}

export default function CartList({cart, handleQuantityChange}: CartListProps) {
  // const cartEntries = Object.entries(cart);

  if (!cart) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(cart)}
        keyExtractor={([menuid]) => menuid}
        renderItem={({item}) => {
          const [menuid, cartItem] = item;
          return (
            <CartListItem
              key={menuid}
              menuid={parseInt(menuid)}
              item={cartItem}
              handleQuantityChange={handleQuantityChange}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});
