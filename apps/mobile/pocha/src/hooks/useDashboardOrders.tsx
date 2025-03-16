import { getPochaOrders } from "@/apis/pocha/queries";
import { OrderItem, Orders, OrderStatus } from "@/types/pocha";
import { useCallback, useEffect, useState, useMemo } from "react";

// utility functions ----------------------------------------
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
const convertOrdersToMap = (orders: Orders) => {
  const map = new Map<number, OrderItem>();
  [...orders.pending, ...orders.preparing, ...orders.ready].forEach((order) => {
    map.set(order.orderItemID, order);
  });
  return map;
};

/*
  @desc filter orders by status
  @param ordersMap: Map<number, OrderItem>
  @param isImmediatePrep: boolean
  @return Orders
*/
const filterOrdersByStatus = (
  ordersMap: Map<number, OrderItem>,
  isImmediatePrep: boolean
): Orders => {
  const statuses = [
    OrderStatus.PENDING,
    OrderStatus.PREPARING,
    OrderStatus.READY,
  ];

  return statuses.reduce((acc, status) => {
    acc[status] = Array.from(ordersMap.values()).filter(
      (order) =>
        order.status === status &&
        Boolean(order.menu.isImmediatePrep) === isImmediatePrep
    );
    return acc;
  }, {} as Orders);
};

// hooks ----------------------------------------
/*
  @desc hook to fetch pocha orders and store in map
  @param pochaID: number
  @param token: string
  @return { ordersMap, status, setOrdersMap, setStatus }
*/
const usePochaOrdersMap = (pochaID: number, token: string) => {
  // ordersMap: Map<orderItemID, OrderItem>
  // map is used for faster lookup to update the UI
  const [ordersMap, setOrdersMap] = useState<Map<number, OrderItem>>(new Map());
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const fetchPochaOrders = async () => {
      try {
        const res: Orders = await getPochaOrders(pochaID, token);
        setOrdersMap(convertOrdersToMap(res));
        setStatus("success");
      } catch (error) {
        console.error("Error fetching orders:", error);
        setStatus("error");
      }
    };

    fetchPochaOrders();
  }, [pochaID, token]);

  return { ordersMap, status, setOrdersMap, setStatus };
};

/*
  @desc Main hook to manage pocha orders
  @param pochaID: number
  @param token: string
  @return { immediatePrepOrders, notImmediatePrepOrders, addNewOrderItem, updateOrderItemStatusUI, status }
*/
const useDashboardOrders = (pochaID: number, token: string) => {
  const { ordersMap, status, setOrdersMap, setStatus } = usePochaOrdersMap(
    pochaID,
    token
  );

  const addNewOrderItem = (orderItem: OrderItem) => {
    setOrdersMap((prevOrdersMap) => {
      if (prevOrdersMap.has(orderItem.orderItemID)) {
        console.warn("Order item already exists:", orderItem.orderItemID);
        return prevOrdersMap;
      }
      const updatedMap = new Map(prevOrdersMap);
      updatedMap.set(orderItem.orderItemID, orderItem);
      return updatedMap;
    });
  };

  // More efficient order item status update using Map
  const updateOrderItemStatusUI = useCallback(
    (orderItemID: number) => {
      setOrdersMap((prevOrdersMap) => {
        const updatedMap = new Map(prevOrdersMap);
        const order = updatedMap.get(orderItemID);
        if (!order) return updatedMap;

        const nextStatus = getNextStatus(order.status);
        if (nextStatus) {
          // Clone the order object to avoid mutating the original
          // Remove the order first, then add it back to the end of the Map
          updatedMap.delete(orderItemID);
          updatedMap.set(orderItemID, { ...order, status: nextStatus });
        }
        return updatedMap;
      });
    },
    [setOrdersMap]
  );

  // Derived state using the utility function
  const immediatePrepOrders = useMemo(() => {
    if (!ordersMap.size) return { pending: [], preparing: [], ready: [] };
    return filterOrdersByStatus(ordersMap, true);
  }, [ordersMap]);

  const notImmediatePrepOrders = useMemo(() => {
    if (!ordersMap.size) return { pending: [], preparing: [], ready: [] };
    return filterOrdersByStatus(ordersMap, false);
  }, [ordersMap]);

  return {
    immediatePrepOrders,
    notImmediatePrepOrders,
    addNewOrderItem,
    updateOrderItemStatusUI,
    status,
  };
};

export default useDashboardOrders;
