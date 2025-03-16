import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { OrderItem } from "@/types/pocha";
import { WEBSOCKET_URL } from "@/constants/env";

interface useDashboardOrderSocketProps {
  token: string;
  email: string;
  pochaID: number;
  addNewOrderItem: (orderItem: OrderItem) => void;
}

const useDashboardOrderSocket = ({
  token,
  email,
  pochaID,
  addNewOrderItem,
}: useDashboardOrderSocketProps) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token || !pochaID) return;

    // Initialize socket connection
    socketRef.current = io(WEBSOCKET_URL, {
      transports: ["websocket"],
      auth: { token },
      query: { email, pochaId: pochaID },
    });

    // Connection event handlers
    socketRef.current.on("connect", () =>
      console.log("Connected to WebSocket server")
    );
    socketRef.current.on("connect_error", (error) =>
      console.error("WebSocket connection error:", error)
    );

    // Listen for order-created event
    socketRef.current.on(
      "order-created",
      ({ newOrderItems }: { newOrderItems: OrderItem[] }) => {
        newOrderItems.forEach(addNewOrderItem);
      }
    );

    // Cleanup on unmount
    return () => {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.disconnect();
      }
    };
  }, [token, email, pochaID, addNewOrderItem]);

  return socketRef;
};

export default useDashboardOrderSocket;
