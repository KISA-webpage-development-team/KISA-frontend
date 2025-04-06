// useUserOrderSocket.ts
import {useEffect, useRef} from 'react';
import {OrderItem, OrderStatus} from '@/types/pocha';
// import {io, Socket} from 'socket.io-client';
// import {WEBSOCKET_URL} from '@env';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// interface UseUserOrderSocketProps {
//   token: string | null;
//   email: string;
//   pochaID: number;
//   updateOrder: (orderItemID: number) => void;
//   addNewOrderItem: (orderItem: OrderItem) => void;
// }

interface UseOrderUpdateListenerProps {
  token: string | null;
  email: string;
  pochaID: number;
  updateOrder: (orderItemID: number, newStatus: OrderStatus) => void;
  addNewOrderItem: (orderItem: OrderItem) => void;
}

const useUserOrderSocket = ({
  token,
  email,
  pochaID,
  updateOrder,
  addNewOrderItem,
}: UseOrderUpdateListenerProps) => {
  // const socketRef = useRef<Socket | null>(null);
  const listenerRef = useRef<any>(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!token || !email || !pochaID || isMountedRef.current) return;

    // Handle incoming notifications (foreground and background)
    listenerRef.current = PushNotificationIOS.addEventListener(
      'notification',
      notification => {
        const data = notification.getData();
        console.log('[OrderUpdate] Received notification:', data);

        if (data && data.custom_data) {
          const customData =
            typeof data.custom_data === 'string'
              ? JSON.parse(data.custom_data)
              : data.custom_data;
          if (customData.event === 'order-status-update') {
            updateOrder(customData.orderItemID, customData.status);
            notification.finish(PushNotificationIOS.FetchResult.NewData);
          }
        } else {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
    );

    isMountedRef.current = true;

    // // Initialize socket connection
    // socketRef.current = io(WEBSOCKET_URL, {
    //   transports: ['websocket'],
    //   auth: {token},
    //   query: {email, pochaId: pochaID},
    // });

    // // Connection event handlers
    // socketRef.current.on('connect', () =>
    //   console.log('[UserSocket] Connected to WebSocket server'),
    // );
    // socketRef.current.on('connect_error', error =>
    //   console.error('[UserSocket] Connection error:', error),
    // );

    // // Listen for order-created event (new orders)
    // socketRef.current.on(
    //   'order-created',
    //   ({newOrderItems}: {newOrderItems: OrderItem[]}) => {
    //     newOrderItems.forEach(addNewOrderItem);
    //   },
    // );

    // // Listen for status-change-{email} event
    // const statusChangeEvent = `status-change-${email}`;
    // socketRef.current.on(
    //   statusChangeEvent,
    //   ({orderItemID, status}: {orderItemID: number; status: OrderStatus}) => {
    //     updateOrder(orderItemID);
    //   },
    // );

    // // Listen for status-closed-{email} event
    // const closedEvent = `status-closed-${email}`;
    // socketRef.current.on(
    //   closedEvent,
    //   ({orderItemID}: {orderItemID: number}) => {
    //     updateOrder(orderItemID);
    //   },
    // );

    // Cleanup on unmount
    return () => {
      // if (socketRef.current && socketRef.current.connected) {
      //   socketRef.current.disconnect();
      // }
      if (listenerRef.current) {
        listenerRef.current.remove();
        listenerRef.current = null;
        isMountedRef.current = false;
      }
    };
  }, [token, email, pochaID, updateOrder, addNewOrderItem]); // Include the memoized functions

  // return socketRef;
  return listenerRef;
};

export default useUserOrderSocket;
