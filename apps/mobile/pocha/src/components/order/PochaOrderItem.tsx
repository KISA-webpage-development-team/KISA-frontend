import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {getMenuImageSrc} from '@/utils/getImageSrc';
import OrderTicketModal from './OrderTicketModal';
//import OrderTicketModal from './OrderTicketModal';
import {STATUS_COLORS, STATUS_TEXT_COLORS} from '@/utils/statusToColor';
import {OrderStatus, MenuItem, OrderItem} from '@/types/pocha';
import TicketIcon from '@/shared/components/icon/TicketIcon';
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
            source={getMenuImageSrc(menu?.menuID)} // Replace with real image URL later
            style={styles.image}
          />
        </View>

        <View style={styles.infoContainer}>
          {/* Menu name */}
          <View style={styles.nameRow}>
            <Text style={[styles.menuName, styles.boldText]} numberOfLines={2}>
              {menu?.nameKor} {menu?.nameEng}
            </Text>
          </View>
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
                {/* <Text style={styles.ticketIcon}>t</Text> */}
                <TicketIcon />
                <Text
                  style={[
                    styles.statusText,
                    {color: STATUS_TEXT_COLORS[status]},
                  ]}>
                  View Ticket
                </Text>
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    marginRight: 8,
  },
  // Image container
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    borderColor: '#D1D5DB',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Info container (menu name, quantity, etc.)
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  nameRow: {
    // flex items-center gap-[0.25rem]
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 2,
  },
  menuName: {
    fontSize: 16,
    lineHeight: 24,
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
    backgroundColor: '#F4F4F5',
    borderRadius: 9,
    // flex items-center justify-center
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    // px-2 py-[0.25rem]
    paddingHorizontal: 8, // ~ 2 * 4px
    paddingVertical: 4, // 0.25rem ~
  },
  orderIdText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  // Status container on the right side
  statusContainer: {
    justifyContent: 'center',
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
    width: 128,
    height: 32, // ~2rem
    marginTop: 8,
    gap: 4,
  },
  ticketIcon: {
    marginRight: 8,
  },
  viewTicketButtonText: {
    fontSize: 14,
    lineHeight: 21, // ~150% for fontSize 14
    color: '#000',
  },
});
