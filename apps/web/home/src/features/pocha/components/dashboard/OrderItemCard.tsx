import { OrderItem, OrderStatus } from "@/types/pocha";
import React, { useState } from "react";
import { STATUS_COLORS } from "../../utils/statusToColor";
import { changeOrderItemStatus } from "@/apis/pocha/mutations";
import { Spinner } from "@nextui-org/react";

interface OrderItemCardProps {
  isDrink?: boolean;
  order: OrderItem;
  updateOrderItemStatusUI: (
    orderItemID: number,
    newStatus: OrderStatus
  ) => void;
}

// orderItemID: number;
// status: OrderStatus;
// menu: MenuItem;
// quantity: number;
// ordererName: string;
// ordererEmail: string;

export default function OrderItemCard({
  isDrink = false, // this is a temporary solution, need to refactor later
  order,
  updateOrderItemStatusUI,
}: OrderItemCardProps) {
  const { orderItemID, status, quantity, menu, ordererName } = order;
  const { nameKor } = menu;

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleSelectCard = () => {
    setSelected(!selected);
  };

  const handleUpdateOrderStatusChange = async () => {
    // if isDrink, change status from "pending" to "ready"
    // how? just call api and updateOrderItemStatusUI twice

    setLoading(true);

    const res = await changeOrderItemStatus(orderItemID);
    if (res) {
      updateOrderItemStatusUI(orderItemID, res?.newStatus);
    }

    setLoading(false);
  };

  return (
    <li className="flex-1">
      <div
        className={`p-4 flex flex-col items-start gap-2 bg-white rounded-lg shadow-md 
    transition-all border-4 duration-300 ease-in-out 
    hover:shadow-lg w-full h-full cursor-pointer 
    ${selected ? "border-blue-500" : "border-transparent"}
    `}
        role="button"
        tabIndex={0}
        onClick={handleSelectCard}
      >
        <div className="flex justify-between items-center w-full">
          <span className="text-3xl font-semibold">#{orderItemID}</span>
          <span className="text-xl font-semibold">
            {nameKor} x {quantity}
          </span>
        </div>
        <span className="text-lg">
          Customer: <strong>{ordererName}</strong>
        </span>
        <div className="flex justify-between w-full">
          <div
            className={`flex items-center gap-2
               px-2 py-1 rounded-md ${STATUS_COLORS[status]} bg-opacity-40`}
          >
            <span className="text-lg">{status}</span>
          </div>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-md
              disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed
            "
            disabled={!selected || loading}
            onClick={handleUpdateOrderStatusChange}
          >
            {loading ? (
              <Spinner size="sm" color="secondary" labelColor="primary" />
            ) : (
              "Promote"
            )}
          </button>
        </div>
      </div>
    </li>
  );
}
