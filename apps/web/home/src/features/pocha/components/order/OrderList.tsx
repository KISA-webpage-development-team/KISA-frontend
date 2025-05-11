import React from "react";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import useUserOrders from "../../hooks/useUserOrders";
import { useSession } from "next-auth/react";

import { UserSession } from "@/lib/next-auth/types";
import PochaOrderItem from "./PochaOrderItem";
import { Tabs, Tab } from "@nextui-org/react"; // Using Tabs
import useUserOrderSocket from "../../hooks/useUserOrderSocket";
import LoadingSpinner from "@/final_refactor_src/components/feedback/LoadingSpinner";

interface OrderListProps {
  pochaID: number;
}

export default function OrderList({ pochaID }: OrderListProps) {
  const { data: session, status: sessionStatus } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };

  const {
    updateOrder,
    addNewOrderItem,
    pendingOrders,
    preparingOrders,
    readyOrders,
    closedOrders,
    status: ordersStatus,
  } = useUserOrders(session?.user?.email, session?.token, pochaID);

  useUserOrderSocket({
    token: session?.token,
    email: session?.user?.email,
    pochaID,
    updateOrder,
    addNewOrderItem,
  });

  // UI Rendering ----------------------------------------------
  if (sessionStatus === "loading" || ordersStatus === "loading") {
    return (
      <LoadingSpinner fullScreen={false} label="주문 목록 가져오는중..." />
    );
  }

  return (
    <div className="flex flex-col w-full h-full py-[0.6rem]">
      {/* Tabs for Order Status */}
      <Tabs
        className={`${sejongHospitalBold.className} w-full`}
        size="md"
        fullWidth
        aria-label="Order Status"
        radius="sm"
      >
        {/* All Tab */}
        <Tab key="all" title="All">
          {(() => {
            // An array that combines all 3: pending, preparing, ready.
            const allOrders = [
              ...readyOrders,
              ...preparingOrders,
              ...pendingOrders,
              ...closedOrders,
            ];

            // If allOrders array length = 0 --> No order request has been made.
            return allOrders.length === 0 ? (
              <div className="text-center mt-4">
                You haven&apos;t placed any orders yet.
              </div>
            ) : (
              // Else
              <ul className="self-stretch flex flex-col gap-[1rem]">
                {allOrders.map((orderItem) => (
                  <PochaOrderItem
                    key={orderItem.orderItemID}
                    orderItem={orderItem}
                  />
                ))}
              </ul>
            );
          })()}
        </Tab>

        {/* Pending Tab */}
        <Tab key="pending" title="Pending">
          <ul className="self-stretch flex flex-col gap-[1rem]">
            {pendingOrders?.map((orderItem, idx) => (
              <PochaOrderItem
                key={orderItem.orderItemID}
                orderItem={orderItem}
              />
            ))}
          </ul>
        </Tab>

        {/* Preparing Tab */}
        <Tab key="preparing" title="Preparing">
          <ul className="self-stretch flex flex-col gap-[1rem]">
            {preparingOrders?.map((orderItem, idx) => (
              <PochaOrderItem
                key={orderItem.orderItemID}
                orderItem={orderItem}
              />
            ))}
          </ul>
        </Tab>

        {/* Ready Tab */}
        <Tab key="ready" title="Ready">
          <ul className="self-stretch flex flex-col gap-[1rem]">
            {readyOrders?.map((orderItem, idx) => (
              <PochaOrderItem
                key={orderItem.orderItemID}
                orderItem={orderItem}
              />
            ))}
          </ul>
        </Tab>
      </Tabs>
    </div>
  );
}
