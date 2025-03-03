// READ!
// TODO: Replace the icons and image URL with real ones. Session is all commented out.

// UNUSED IMPORT:
// import Image from 'next/image';
// import {changeItemInCart} from '@/apis/pocha/mutations';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
// import PochaBackIcon from '@/final_refactor_src/components/icon/PochaBackIcon';
// import PochaButton from '../shared/PochaButton';

// // Types
// import {MenuItem} from '@/types/pocha';
// import {UserSession} from '@/lib/next-auth/types';
// import PochaMenuPlusIcon from '@/final_refactor_src/components/icon/PochaMenuPlusIcon';
// import PochaMenuMinusIcon from '@/final_refactor_src/components/icon/PochaMenuMinusIcon';

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {getMenuImagePath} from '../../utils/getImagePath';
import PochaErrorMsg from '../../shared/components/feedback/PochaErrorMsg';
import LoadingSpinner from '../../shared/components/feedback/LoadingSpinner';

interface MenuItem {
  menuID: number;
  nameKor: string;
  nameEng: string;
  price: number;
  stock: number;
  ageCheckRequired: boolean;
}

interface MenuItemDetailProps {
  // session: UserSession | undefined;
  selectedMenu: MenuItem;
  setSelectedMenu: (selectedMenu: MenuItem | undefined) => void;
  pochaid: number;
}

export default function MenuItemDetail({
  // session,
  selectedMenu,
  setSelectedMenu,
  pochaid,
}: MenuItemDetailProps) {
  // Loading state for add to cart button
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  // Counter Logic
  const [quantity, setQuantity] = useState<number>(1);
  // Error Message
  const [error, setError] = useState<string | null>(null);

  // useEffect needed because the price cumulation should reset for each menu.
  useEffect(() => {
    setQuantity(1);
  }, [selectedMenu]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (error !== null) {
      setError(null);
    }

    // Default quantity starts at 1.
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBackButton = () => {
    // This is to return back to original page = Show original PochaMenuList.
    setSelectedMenu(undefined);
  };

  // add menu item and its quantity to the cart
  const handleAddToCart = async () => {
    setAddingToCart(true);
    // Posting info to DB.
    const addedMenu = {
      menuID: selectedMenu.menuID,
      quantity: quantity,
    };

    // try {
    //   const res = await changeItemInCart(
    //     // session?.user?.email,
    //     pochaid,
    //     addedMenu,
    //   );

    //   if (!res) {
    //     console.error('Error updating cart item quantity');
    //     setAddingToCart(false);
    //     return;
    //   }

    //   //  1. out of stock
    //   if (res.isStocked === false) {
    //     setError('Out of stock');
    //     setAddingToCart(false);
    //     return;
    //   }

    //   // 2. success
    //   setAddingToCart(false);

    //   // redirect to the original page
    //   setSelectedMenu(undefined);
    // } catch (error) {
    //   console.log('Error message: ', error);
    // }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton}>
          <Text>Back</Text> {/* Replace with back icon */}
        </TouchableOpacity>
      </View>

      {/* Food Image */}
      <Image
        source={{uri: getMenuImagePath(selectedMenu.menuID)}}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Menu Details */}
      <View style={styles.card}>
        <Text style={styles.menuNameKor}>{selectedMenu.nameKor}</Text>
        <Text style={styles.menuNameEng}>{selectedMenu.nameEng}</Text>

        <View style={styles.divider} />

        {/* Price */}
        <Text style={styles.price}>${selectedMenu.price * quantity}</Text>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <Text style={styles.label}>수량</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={decrementQuantity}
              disabled={quantity === 1}>
              <Text>-</Text> {/* Replace with minus icon */}
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity}>
              <Text>+</Text> {/* Replace with minus icon */}
            </TouchableOpacity>
          </View>
        </View>

        {/* Error Message */}
        {error !== null && <PochaErrorMsg message={error} />}

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          disabled={addingToCart}>
          {addingToCart ? (
            <LoadingSpinner label="Adding to Cart..." />
          ) : (
            <Text style={styles.addToCartText}>Add to Cart</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    elevation: 2,
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: -80, // Pull up to overlap image
  },
  image: {
    width: '100%',
    aspectRatio: 5 / 4,
  },
  menuNameKor: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginTop: 10,
  },
  menuNameEng: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 14,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#D1D5DB',
    marginTop: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 12,
  },
  quantityContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    paddingVertical: 16,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: 20,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 24,
  },
  errorMsg: {
    color: 'red',
    marginTop: 8,
    fontSize: 14,
  },
  addToCartButton: {
    marginTop: 16,
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  addToCartText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
