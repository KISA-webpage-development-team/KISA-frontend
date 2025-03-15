// import PochaCloseIcon from '@/final_refactor_src/components/icon/PochaCloseIcon';
// import {OrderItem} from '@/types/pocha';
// import {sejongHospitalBold} from '@/utils/fonts/textFonts';
// import {sejongHospitalLight} from '@/utils/fonts/textFonts';
import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { OrderStatus, MenuItem, OrderItem } from '../../types/pocha';

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

//   return (
//     < className="fixed inset-0 z-[99999] bg-black/30">
//       <div className="relative z-[100000] w-full h-full flex items-center justify-center">
//         <div
//           className="relative flex flex-col items-center justify-center
//          space-y-4 bg-white rounded-lg shadow-md text-black
//          border-2 border-[#71717A] h-[30%] aspect-[8/5]">
//           <button
//             className="absolute top-[1rem] right-[1rem]"
//             onClick={handleCloseModal}>
//             <PochaCloseIcon size="extra-large" />
//           </button>
//           <span className={`text-lg ${sejongHospitalBold.className}`}>
//             Order Ready!
//           </span>
//           <span
//             className={`text-4xl ${sejongHospitalBold.className}`}>{`#${orderItemID}`}</span>
//           <span className={`text-lg font-medium`}>
//             {menu.nameKor} is ready for pickup
//           </span>
//         </div>
//       </div>
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
            <Text style={[styles.orderReadyText]}>
                Order Ready!
            </Text>
            <Text style={[styles.orderItemId]}>
                {`#${orderItemID}`}
            </Text>
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
    position: 'absolute',
    width: '80%',
    top: 180,
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
    fontWeight: 'bold',
  },
  orderItemId: {
    fontSize: 32, // text-4xl
    color: '#000',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  pickupText: {
    fontSize: 18, // text-lg
    fontWeight: '500',
    color: '#6B7280',
  },
});