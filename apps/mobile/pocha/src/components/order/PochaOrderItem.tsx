import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {OrderItem} from '../../types/pocha';
import {getMenuImagePath} from '../../utils/getImagePath';
import OrderTicketModal from './OrderTicketModal';
import {STATUS_COLORS, STATUS_TEXT_COLORS} from '../../utils/statusToColor';

interface PochaOrderItemProps {
  orderItem: OrderItem;
  setSelectedOrder?: (orderItem: OrderItem) => void;
}

export function capitalizeStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

export default function PochaOrderItem({orderItem}: PochaOrderItemProps) {
  const {menu, quantity, status} = orderItem;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleViewTicket = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      {/* Conditionally render your modal if needed */}
      {isOpenModal && (
        <OrderTicketModal
          orderItem={orderItem}
          setIsOpenModal={setIsOpenModal}
        />
      )}

      <View
        style={[
          styles.listItem,
          status === 'ready' ? styles.readyBorder : styles.defaultBorder,
        ]}>
        <View
          style={[
            styles.statusCircle,
            {backgroundColor: STATUS_COLORS[status]},
          ]}
        />

        <View style={styles.imageContainer}>
          <Image
            source={{uri: getMenuImagePath(menu?.menuID)}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoContainer}>
          {/* Menu name */}
          <Text style={[styles.menuName, styles.boldText]}>
            {menu?.nameKor} {menu?.nameEng}
          </Text>
          {/* Quantity and total price */}
          <Text style={styles.priceText}>
            {`x ${quantity}`} | {`$${menu?.price * quantity}`}
          </Text>

          {/* Show orderItemID only if status === "ready" */}
          {status === 'ready' && (
            <View style={styles.orderIdContainer}>
              <Text style={styles.orderIdText}># {orderItem?.orderItemID}</Text>
            </View>
          )}
        </View>

        {/* Status and ticket button on the right side */}
        <View style={styles.statusContainer}>
          {status === 'ready' ? (
            <View style={styles.statusReadyContainer}>
              <Text
                style={[
                  styles.statusText,
                  {color: STATUS_TEXT_COLORS[status]},
                ]}>
                {capitalizeStatus(orderItem?.status)}
              </Text>
              <TouchableOpacity
                onPress={handleViewTicket}
                style={styles.viewTicketButton}>
                {/*should add a ticket icon here later */}

                <Text style={styles.viewTicketButtonText}>View Ticket</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text
              style={[styles.statusText, {color: STATUS_TEXT_COLORS[status]}]}>
              {capitalizeStatus(status)}
            </Text>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 2,
  },
  // For "ready" status, thicker green border
  readyBorder: {
    borderWidth: 2,
    borderColor: 'green',
  },
  // Default border style
  defaultBorder: {
    borderWidth: 1,
    borderColor: '#E4E4E7', // e.g., tailwind zinc-200
  },
  // Colored circle
  statusCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  // Image container
  imageContainer: {
    width: 64, // ~4rem
    height: 64, // ~4rem
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  // Info container (menu name, quantity, etc.)
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  menuName: {
    fontSize: 16,
    marginBottom: 4,
  },
  priceText: {
    fontSize: 14,
    color: '#6B7280', // tailwind gray-500
    marginBottom: 4,
  },
  // Example bold text style (replace with your custom font if desired)
  boldText: {
    fontWeight: 'bold',
  },
  // ID container (displayed if status === "ready")
  orderIdContainer: {
    backgroundColor: '#F5F5F5', // tailwind zinc-100
    borderRadius: 9,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  orderIdText: {
    fontSize: 14,
    color: '#000',
  },
  // Status container on the right side
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusReadyContainer: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  // "View Ticket" button
  viewTicketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCFCE7', // tailwind green-100
    borderColor: 'rgba(28,130,65,0.5)', // #1c8241/50
    borderWidth: 1,
    borderRadius: 5,
    width: 128, // ~8rem
    height: 32, // ~2rem
    marginTop: 8,
  },
  ticketIcon: {
    marginRight: 4,
  },
  viewTicketButtonText: {
    fontSize: 14,
    lineHeight: 20, // ~150% for fontSize 14
    color: '#000',
  },
});
