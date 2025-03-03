/*
  ViewCartButton
  - Button to view cart
  - Navigates to cart page with pochaID
*/

// READ!
// TODO: Figure out Cart Icon!

// UNUSED IMPORT:
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PochaCartIcon from '../../assets/icon/pochaCartIcon.tsx';
import {TouchableOpacity} from 'react-native';

interface ViewCartButtonProps {
  pochaID: number;
}

export default function ViewCartButton({pochaID}: ViewCartButtonProps) {
  const handleViewCart = () => {
    // Leave these 2 comments below commented for now. --> navigate to cart page with pochaID
    // const queryParams = `pochaid=${pochaID}`;
    // window.location.href = `/pocha/cart?${queryParams}`;
    console.log('Navigate to Cart'); // temp. checking method
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={handleViewCart} style={styles.viewCartButton}>
        {/* <PochaCartIcon /> */}
        <Text style={styles.viewCartText}>View Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  viewCartButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  viewCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
