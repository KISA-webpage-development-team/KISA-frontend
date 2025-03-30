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
import {TouchableOpacity} from 'react-native';
import {useMainNavigation} from '@/navigations/useMainNavigation.ts';
import PochaButton from '../shared/PochaButton';

interface ViewCartButtonProps {
  pochaID: number;
}

export default function ViewCartButton({pochaID}: ViewCartButtonProps) {
  const navigation = useMainNavigation();

  const handleViewCart = () => {
    navigation.navigate('CartScreen', {pochaID});
  };

  return (
    <View style={styles.container}>
      <PochaButton
        label="View Cart"
        onClick={handleViewCart}
        widthPercentage={100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '10%',
  },
});
