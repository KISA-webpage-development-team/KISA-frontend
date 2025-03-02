import {
  getUserOrders,
  getPochaOrders,
  getUserClosedOrders,
} from "@/apis/pocha/queries";
import { OrderHistory, OrderItem, Orders, OrderStatus } from "@/types/pocha";
import { useCallback, useEffect, useState } from "react";

/*
  @desc get the next status of the order item
  @param status: OrderStatus
  @return OrderStatus | null
*/
const getNextStatus = (status: OrderStatus): OrderStatus | null => {
  const statusFlow = {
    [OrderStatus.PENDING]: OrderStatus.PREPARING,
    [OrderStatus.PREPARING]: OrderStatus.READY,
    [OrderStatus.READY]: OrderStatus.CLOSED,
    [OrderStatus.CLOSED]: null,
  };
  return statusFlow[status] || null;
};

/*
  @desc convert orders to map
  @param orders: Orders
  @return Map<number, OrderItem>
*/
const convertOrdersToMap = (orders: Orders & OrderHistory) => {
  const map = new Map<number, OrderItem>();
  [
    ...orders.pending,
    ...orders.preparing,
    ...orders.ready,
    ...orders.closed,
  ].forEach((order) => {
    map.set(order.orderItemID, order);
  });
  return map;
};

/*
  @desc hook to fetch user orders (getUserOrders)
  @params email, token, pochaID
*/
const useUserOrdersMap = (email: string, token: string, pochaID: number) => {
  const [ordersMap, setOrdersMap] = useState<Map<number, OrderItem>>(new Map());
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await getUserOrders(email, pochaID, token);

        const closedRes = await getUserClosedOrders(email, pochaID, token);

        const orders = {
          ...res,
          closed: closedRes.closed,
        };

        setOrdersMap(convertOrdersToMap(orders));
        setStatus("success");
      } catch (error) {
        console.error("Error fetching orders: ", error);
        setStatus("error");
      }
    };

    if (pochaID && token) {
      fetchUserOrders();
    }
  }, [email, pochaID, token]);

  return { ordersMap, status, setOrdersMap, setStatus };
};

/**
 * @desc hook to fetch user orders (getUserOrders)
 * @params email, token, pochaID
 */

const useUserOrders = (email: string, token: string, pochaID: number) => {
  const { ordersMap, status, setOrdersMap, setStatus } = useUserOrdersMap(
    email,
    token,
    pochaID
  );

  const updateOrder = (orderItemID: number) => {
    setOrdersMap((prevMap) => {
      const newMap = new Map(prevMap);
      const orderItem = prevMap.get(orderItemID);

      // if orderItem.menu.isImmediatePrep, then we need to "jump" preparing step
      // pending -> ready
      // ready -> closed

      if (
        orderItem?.menu.isImmediatePrep &&
        orderItem?.status === OrderStatus.PENDING
      ) {
        newMap.set(orderItemID, {
          ...orderItem,
          status: OrderStatus.READY,
        });
      } else {
        const nextStatus = getNextStatus(orderItem?.status);
        if (nextStatus) {
          newMap.delete(orderItemID);
          newMap.set(orderItemID, { ...orderItem, status: nextStatus });
        }
      }

      return newMap;
    });
  };

  const addNewOrderItem = (orderItem: OrderItem) => {
    setOrdersMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(orderItem.orderItemID, orderItem);
      return newMap;
    });
  };

  const pendingOrders = Array.from(ordersMap.values()).filter(
    (order) => order.status === "pending"
  );
  const preparingOrders = Array.from(ordersMap.values()).filter(
    (order) => order.status === "preparing"
  );
  const readyOrders = Array.from(ordersMap.values()).filter(
    (order) => order.status === "ready"
  );
  const closedOrders = Array.from(ordersMap.values()).filter(
    (order) => order.status === "closed"
  );

  return {
    updateOrder,
    addNewOrderItem,
    pendingOrders,
    preparingOrders,
    readyOrders,
    closedOrders,
    status,
  };
};

export default useUserOrders;
