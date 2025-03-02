import { getPochaClosedOrders } from "@/apis/pocha/queries";
import { OrderHistory } from "@/types/pocha";
import { useEffect, useState } from "react";

/**
 * @desc hook to fetch user orders (getUserOrders)
 * @params email, token, pochaID
 */
const useOrderHistory = (token: string, pochaID: number) => {
  const [orderHistory, setOrderHistory] = useState<OrderHistory>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  // fetch orders
  useEffect(() => {
    const fetchPochaClosedOrders = async () => {
      try {
        const res = await getPochaClosedOrders(pochaID, token);

        setOrderHistory({ ...res, closed: res.closed.reverse() });
        setStatus("success");
      } catch (error) {
        console.error("Error fetching orders: ", error);
        setStatus("error");
      }
    };

    if (pochaID && token) {
      fetchPochaClosedOrders();
    }
  }, [pochaID, token]);

  return {
    orderHistory: orderHistory?.closed,
    status,
  };
};

export default useOrderHistory;
