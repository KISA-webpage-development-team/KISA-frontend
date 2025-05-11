import { OrderStatus, Orders } from "@/types/pocha";
import React from "react";
import OrderItemCard from "./OrderItemCard";
import { STATUS_COLORS } from "../../utils/statusToColor";

interface FoodOrderGridProps {
  orders: Orders;
  updateOrderItemStatusUI: (
    orderItemID: number,
    newStatus: OrderStatus
  ) => void;
}

export default function FoodOrderGrid({
  orders = { pending: [], preparing: [], ready: [] },
  updateOrderItemStatusUI,
}: FoodOrderGridProps) {
  const { pending, preparing, ready } = orders;

  const itemStatusHeaderStyle = (status: string) => {
    const style = `text-lg font-semibold
     flex items-center justify-center p-1 rounded-md`;

    if (status === "pending") return `${style} ${STATUS_COLORS.pending} `;
    if (status === "preparing") return `${style} ${STATUS_COLORS.preparing} `;
    if (status === "ready") return `${style} ${STATUS_COLORS.ready}`;
  };

  return (
    <div className="flex flex-col self-stretch gap-2 bg-slate-100 p-2 rounded-lg">
      <h2 className="text-2xl font-bold ml-2">Food Orders</h2>
      <div className="flex gap-2">
        <div className="flex-1">
          <div className={itemStatusHeaderStyle("pending")}>
            <h3>Pending</h3>
          </div>
          <ul className="flex flex-col gap-2 mt-2">
            {pending?.map((order) => (
              <OrderItemCard
                key={order.orderItemID}
                order={order}
                updateOrderItemStatusUI={updateOrderItemStatusUI}
              />
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <div className={itemStatusHeaderStyle("preparing")}>
            <h3>Preparing</h3>
          </div>
          <ul className="flex flex-col gap-2 mt-2">
            {preparing?.map((order) => (
              <OrderItemCard
                key={order.orderItemID}
                order={order}
                updateOrderItemStatusUI={updateOrderItemStatusUI}
              />
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <div className={itemStatusHeaderStyle("ready")}>
            <h3>Ready</h3>
          </div>
          <ul className="flex flex-col gap-2 mt-2">
            {ready?.map((order) => (
              <OrderItemCard
                key={order.orderItemID}
                order={order}
                updateOrderItemStatusUI={updateOrderItemStatusUI}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
