import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {CartItem} from '@/types/pocha';
import {getMenuImageSrc} from '@/utils/getImageSrc';
type CartListItemProps = {
  item: CartItem;
  menuid: number;
  handleQuantityChange: (menuid: number, newQuantity: number) => void;
};

export default function CartListItem({
  item,
  menuid,
  handleQuantityChange,
}: CartListItemProps) {
  const incrementQuantity = () => {
    handleQuantityChange(menuid, 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 0) {
      handleQuantityChange(menuid, -1);
    }
  };

  const removeItemFromCart = () => {
    handleQuantityChange(menuid, -item.quantity);
  };

  if (!item || item.quantity === 0) {
    return null;
  }

  return (
    <View style={styles.itemContainer}>
      {/* Image */}
      <Image source={getMenuImageSrc(menuid)} style={styles.image} />

      {/* Name & Price */}
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>
          {item?.menu?.nameKor} {item?.menu?.nameEng}
        </Text>
        <Text style={styles.price}>
          ${(item?.menu?.price * item.quantity).toFixed(2)}
        </Text>
      </View>

      {/* Counter Container */}
      <View style={styles.counterContainer}>
        {item.quantity > 1 ? (
          <TouchableOpacity
            onPress={decrementQuantity}
            style={styles.counterButton}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={removeItemFromCart}
            style={styles.counterButton}>
            <Text style={styles.buttonText}>🗑</Text>
          </TouchableOpacity>
        )}

        {/* Quantity */}
        <Text style={styles.quantity}>{item.quantity}</Text>

        <TouchableOpacity
          onPress={incrementQuantity}
          style={styles.counterButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#CACACA',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CACACA',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  price: {
    fontSize: 14,
    color: '#666',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#CACACA',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  counterButton: {
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
