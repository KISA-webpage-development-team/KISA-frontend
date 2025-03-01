// useUserOrderSocket.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { OrderItem, OrderStatus } from "@/types/pocha";
import { WEBSOCKET_URL } from "@/constants/env";

interface UseUserOrderSocketProps {
  token: string;
  email: string;
  pochaID: number;
  updateOrder: (orderItemID: number) => void;
  addNewOrderItem: (orderItem: OrderItem) => void;
}

const useUserOrderSocket = ({
  token,
  email,
  pochaID,
  updateOrder,
  addNewOrderItem,
}: UseUserOrderSocketProps) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token || !email || !pochaID) return;

    // Initialize socket connection
    socketRef.current = io(WEBSOCKET_URL, {
      transports: ["websocket"],
      auth: { token },
      query: { email, pochaId: pochaID },
    });

    // Connection event handlers
    socketRef.current.on("connect", () =>
      console.log("[UserSocket] Connected to WebSocket server")
    );
    socketRef.current.on("connect_error", (error) =>
      console.error("[UserSocket] Connection error:", error)
    );

    // Listen for order-created event (new orders)
    socketRef.current.on(
      "order-created",
      ({ newOrderItems }: { newOrderItems: OrderItem[] }) => {
        newOrderItems.forEach(addNewOrderItem);
      }
    );

    // Listen for status-change-{email} event
    const statusChangeEvent = `status-change-${email}`;
    socketRef.current.on(
      statusChangeEvent,
      ({
        orderItemID,
        status,
      }: {
        orderItemID: number;
        status: OrderStatus;
      }) => {
        updateOrder(orderItemID);
      }
    );

    // Listen for status-closed-{email} event
    const closedEvent = `status-closed-${email}`;
    socketRef.current.on(
      closedEvent,
      ({ orderItemID }: { orderItemID: number }) => {
        updateOrder(orderItemID);
      }
    );

    // Cleanup on unmount
    return () => {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.disconnect();
      }
    };
  }, [token, email, pochaID, updateOrder, addNewOrderItem]);

  return socketRef;
};

export default useUserOrderSocket;
