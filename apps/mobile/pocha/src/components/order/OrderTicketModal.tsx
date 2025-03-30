// import PochaCloseIcon from '@/final_refactor_src/components/icon/PochaCloseIcon';
// import {OrderItem} from '@/types/pocha';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
// import {sejongHospitalLight} from '@/utils/fonts/textFonts';
import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {OrderStatus, MenuItem, OrderItem} from '@/types/pocha';

export default function OrderTicketModal({
  orderItem,
  setIsOpenModal,
}: {
  orderItem: OrderItem;
  setIsOpenModal: (isOpen: boolean) => void;
}) {
  const {orderItemID, menu} = orderItem;

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={handleCloseModal}>
      <View style={styles.overlay}>
        <View style={styles.centerContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}>
              {/*should be replaced with an icon later*/}
              <Text>X</Text>
            </TouchableOpacity>
            <Text style={[styles.orderReadyText]}>Order Ready!</Text>
            <Text style={[styles.orderItemId]}>{`#${orderItemID}`}</Text>
            <Text style={[styles.pickupText]}>
              {menu.nameKor} is ready for pickup
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    //position: 'absolute',
    width: '80%',
    //top: 180,
    aspectRatio: 8 / 5,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 2,
    borderColor: '#71717A',
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow (for iOS)
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Elevation (for Android)
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  orderReadyText: {
    fontSize: 18, // text-lg
    color: '#000',
    marginBottom: 8,
    fontFamily: 'sejong-hospital-bold',
  },
  orderItemId: {
    fontSize: 32, // text-4xl
    color: '#000',
    marginBottom: 8,
    fontFamily: 'sejong-hospital-bold',
  },
  pickupText: {
    fontSize: 18, // text-lg
    fontWeight: '500',
    color: '#6B7280',
  },
});
