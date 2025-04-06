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
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {getMenuImageSrc} from '@/utils/getImageSrc';
import PochaErrorMsg from '@/components/shared/PochaErrorMsg';
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner';
import {MenuItem} from '@/types/pocha';
import PochaButton from '../shared/PochaButton';
import {changeItemInCart} from '@/apis/mutations';
import {useUser} from '@/contexts/UserContext';
import {SimpleUser} from '@/types/user';

interface MenuItemDetailProps {
  // session: UserSession | undefined;
  selectedMenu: MenuItem;
  setSelectedMenu: (selectedMenu: MenuItem | undefined) => void;
  pochaID: number;
  visible: boolean;
}

export default function MenuItemDetail({
  // session,
  selectedMenu,
  setSelectedMenu,
  pochaID,
  visible,
}: MenuItemDetailProps) {
  const {user} = useUser();
  const loggedInUser = user as SimpleUser;
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
    // Let the parent component handle the state changes
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

    try {
      const res = await changeItemInCart(
        loggedInUser.email,
        pochaID,
        addedMenu,
      );

      if (!res) {
        throw new Error('Failed to add to cart');
      }

      //  1. out of stock
      if (res.isStocked === false) {
        throw new Error('Out of stock');
      }

      // 2. success
      setAddingToCart(false);

      // return to the menu tab
      setSelectedMenu(undefined);
    } catch (error) {
      setError(error as string);
      setAddingToCart(false);
    }
  };
  if (!selectedMenu) {
    return null;
  }

  // TODO: replace text to icons
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleBackButton}
      transparent={true}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <ScrollView style={styles.container} bounces={false}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleBackButton}
              style={styles.backButton}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={getMenuImageSrc(selectedMenu.menuID)}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.menuNameKor}>{selectedMenu.nameKor}</Text>
            <Text style={styles.menuNameEng}>{selectedMenu.nameEng}</Text>

            <View style={styles.divider} />

            <Text style={styles.price}>${selectedMenu.price * quantity}</Text>

            <View style={styles.quantityContainer}>
              <Text style={styles.label}>수량</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  onPress={decrementQuantity}
                  disabled={quantity === 1}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  onPress={incrementQuantity}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {error !== null && <PochaErrorMsg message={error} />}

            <View style={styles.addToCartButtonContainer}>
              <PochaButton
                label={addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                onClick={handleAddToCart}
                disabled={addingToCart}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  // Image
  imageContainer: {
    width: '100%',
    aspectRatio: 1 / 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  // Menu Details
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
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  menuNameKor: {
    fontSize: 26,
    fontFamily: 'Sejong-hospital-Bold',
    color: 'black',
    marginBottom: 10,
    marginTop: 10,
  },
  menuNameEng: {
    fontSize: 20,
    fontFamily: 'Sejong-hospital-Bold',
    color: 'gray',
    marginBottom: 14,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#D1D5DB',
    marginTop: '3%',
  },
  price: {
    fontSize: 24,
    fontFamily: 'Sejong-hospital-Bold',
    marginTop: 18,
    marginBottom: '4%',
  },
  quantityContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginTop: '3%',
    paddingVertical: '5%',
  },
  label: {
    fontSize: 20,
    fontFamily: 'Sejong-hospital-Bold',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: '6%',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontFamily: 'Sejong-hospital-Bold',
    color: '#374151',
  },
  quantity: {
    fontSize: 18,
    fontFamily: 'Sejong-hospital-Bold',
    textAlign: 'center',
    minWidth: 24,
  },
  errorMsg: {
    color: 'red',
    marginTop: 8,
    fontSize: 14,
  },

  addToCartButtonContainer: {
    width: '100%',
    marginTop: 16,
  },
});
