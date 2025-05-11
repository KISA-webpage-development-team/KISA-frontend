"use client";

import LoadingSpinner from "@/final_refactor_src/components/feedback/LoadingSpinner";
import useDashboard from "../../hooks/useDashboardOrders";
import useDashboardOrderSocket from "../../hooks/useDashboardOrderSocket";
import FoodOrderGrid from "./FoodOrderGrid";
import DrinkOrderGrid from "./DrinkOrderGrid";

interface OrderDashboardProps {
  email: string;
  token: string;
  pochaID: number;
}

export default function OrderDashboard({
  email,
  token,
  pochaID,
}: OrderDashboardProps) {
  const {
    immediatePrepOrders: drinkOrders,
    notImmediatePrepOrders: foodOrders,
    addNewOrderItem,
    updateOrderItemStatusUI,
    status,
  } = useDashboard(pochaID, token);

  useDashboardOrderSocket({
    token,
    email,
    pochaID,
    addNewOrderItem: addNewOrderItem,
  });

  if (status === "loading") {
    return (
      <LoadingSpinner fullScreen={false} label="주문 정보를 가져오는중..." />
    );
  }

  return (
    <div className="flex gap-4">
      {/* 1. Food Orders */}
      <div className="basis-3/5">
        <FoodOrderGrid
          orders={foodOrders}
          updateOrderItemStatusUI={updateOrderItemStatusUI}
        />
      </div>
      {/* 2. Drink Orders */}
      <div className="basis-2/5">
        <DrinkOrderGrid
          orders={drinkOrders}
          updateOrderItemStatusUI={updateOrderItemStatusUI}
        />
      </div>
    </div>
  );
}
