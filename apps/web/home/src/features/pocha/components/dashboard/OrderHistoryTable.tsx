import React, { useState } from "react";
import { OrderItem } from "@/types/pocha";

import useOrderHistory from "../../hooks/useOrderHistory";
import { usePochaMenu } from "@/apis/pocha/swrHooks";
import LoadingSpinner from "@/final_refactor_src/components/feedback/LoadingSpinner";
import { calculateStripeTotalPrice } from "../../utils/calculateStripeFee";

interface OrderHistoryTableProps {
  token: string;
  pochaID: number;
}

type FilterOption = "all" | "food" | "drink";

export default function OrderHistoryTable({
  token,
  pochaID,
}: OrderHistoryTableProps) {
  const { orderHistory, status } = useOrderHistory(token, pochaID);

  const [filter, setFilter] = useState<FilterOption>("all");

  const filteredOrderHistory = orderHistory?.filter(({ menu }) => {
    if (filter === "all") return true;
    return filter === "food" ? !menu.isImmediatePrep : menu.isImmediatePrep;
  });
  // console.log(filteredOrderHistory);

  const calculateTotalSales = () => {
    return filteredOrderHistory
      ?.reduce((acc, { menu, quantity }) => acc + menu.price * quantity, 0)
      .toFixed(2);
  };

  const calculateSummary = () => {
    const anjuOrders =
      filteredOrderHistory?.filter(({ menu }) => !menu.isImmediatePrep) || [];
    const drinkOrders =
      filteredOrderHistory?.filter(({ menu }) => menu.isImmediatePrep) || [];

    const anjuRevenue = anjuOrders
      .reduce((acc, { menu, quantity }) => acc + menu.price * quantity, 0)
      .toFixed(2);
    const drinkRevenue = drinkOrders
      .reduce((acc, { menu, quantity }) => acc + menu.price * quantity, 0)
      .toFixed(2);

    const mostSoldAnju = Object.entries(
      anjuOrders.reduce((acc, { menu, quantity }) => {
        acc[menu.nameKor] = (acc[menu.nameKor] || 0) + quantity;
        return acc;
      }, {} as Record<string, number>)
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([menu, quantity]) => `${menu} (${quantity}개)`)
      .join(", ");

    const mostProfitableAnju = Object.entries(
      anjuOrders.reduce((acc, { menu, quantity }) => {
        acc[menu.nameKor] = (acc[menu.nameKor] || 0) + menu.price * quantity;
        return acc;
      }, {} as Record<string, number>)
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([menu, revenue]) => `${menu} ($${revenue.toFixed(2)})`)
      .join(", ");

    alert(`총 금액: $${calculateTotalSales()}
안주 수익: $${anjuRevenue}
주류 수익: $${drinkRevenue}

(참고: 실제로 음식이 나간 주문들을 기반으로 한 "요약" 기능입니다. 실제 정산과는 차이가 있을 수 있습니다.)
`);
  };

  if (status === "loading") {
    return (
      <LoadingSpinner fullScreen={false} label="주문 기록을 가져오는중..." />
    );
  }

  if (status === "error") {
    throw new Error("Error fetching order history");
  }

  if (!filteredOrderHistory) {
    return <div>No order history found</div>;
  }

  return (
    <div className="w-full">
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 ${
                filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter("food")}
              className={`px-4 py-2 ${
                filter === "food" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              안주
            </button>
            <button
              onClick={() => setFilter("drink")}
              className={`px-4 py-2 ${
                filter === "drink" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              주류
            </button>
          </div>
          <button
            onClick={calculateSummary}
            className="px-4 py-2 bg-green-500 text-white"
          >
            요약하기
          </button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-sm text-black text-center">
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Order #
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Price + Fee
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrderHistory?.map(
              (
                { orderItemID, menu, quantity, ordererName, ordererEmail },
                index
              ) => (
                <tr key={`${orderItemID}-${index}`} className="text-center">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    #{orderItemID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {menu.nameKor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    ${menu.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    ${calculateStripeTotalPrice(menu.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {ordererName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {ordererEmail}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
