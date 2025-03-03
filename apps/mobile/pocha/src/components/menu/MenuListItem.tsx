/**
 * MenuListItem
 * - Displays a menu item card
 */

// READ!
// TODO: Get image with valid URL via menu-id.

// UNUSED IMPORT:
// import {MenuItem} from '@/types/pocha';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
// import {getMenuImagePath} from '@/features/pocha/utils/getImagePath';
// import Image from 'next/image';

import React from 'react';
import {Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native';

interface MenuItem {
  menuID: number;
  nameKor: string;
  nameEng: string;
  price: number;
  stock: number;
  ageCheckRequired: boolean;
}

interface MenuItemCardProps {
  menu: MenuItem;
  underAge: boolean;
  setSelectedMenu: (menu: MenuItem) => void;
  isPriority?: boolean;
}

// Renders the age restriction overlay for underage users (drinks)
const AGE_RESTRICTION_MESSAGE = 'Only for 21+';

function AgeRestrictionOverlay() {
  return <View style={styles.overlay}></View>;
}

export default function MenuListItem({
  menu,
  underAge,
  setSelectedMenu,
  isPriority = false,
}: MenuItemCardProps) {
  const {menuID, nameEng, nameKor, price, ageCheckRequired, stock} = menu;
  const notForUnderAge = ageCheckRequired && underAge;

  const handleMenuClick = () => {
    if (underAge && menu.ageCheckRequired) {
      return;
    }
    setSelectedMenu(menu);
  };

  return (
    <View style={styles.itemContainer}>
      {notForUnderAge && <AgeRestrictionOverlay />}

      <TouchableOpacity
        style={styles.itemContainer}
        onPress={handleMenuClick}
        disabled={notForUnderAge || stock === 0}>
        {/* Menu Item Image */}
        <View style={styles.imageWrapper}>
          <Image
            // src={getMenuImagePath(menuID)}
            source={{uri: 'https://via.placeholder.com/64'}} // Replace with real image URL later
            style={styles.image}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.menuName, stock === 0 && styles.outOfStock]}>
            {nameKor} {nameEng}
          </Text>
          <Text
            style={[styles.menuPrice, stock === 0 && styles.outOfStockPrice]}>
            {stock === 0 ? 'Out of Stock' : `$${price}`}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Overlay if age restricted */}
      {notForUnderAge && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>{AGE_RESTRICTION_MESSAGE}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  imageWrapper: {
    width: 96,
    height: 96,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 6,
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  menuPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 12,
  },
  outOfStock: {
    color: '#aaa',
    textDecorationLine: 'line-through',
  },
  outOfStockPrice: {
    color: 'red',
    fontSize: 18,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(240, 240, 240, 0.4)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  overlayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});
