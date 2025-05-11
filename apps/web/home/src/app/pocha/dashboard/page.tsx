"use client";

import { changeStock } from "@/apis/pocha/mutations";
import OrderHistoryTable from "@/features/pocha/components/dashboard/OrderHistoryTable";
import useMenu from "@/features/pocha/hooks/useMenu";
import usePocha from "@/features/pocha/hooks/usePocha";
import {
  LoadingSpinner,
  NotAuthorized,
} from "@/final_refactor_src/components/feedback";
import useAdmin from "@/lib/next-auth/useAdmin";
import OrderDashboard from "@/features/pocha/components/dashboard/OrderDashboard";
import { PochaDashboardTab } from "@/types/pocha";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import DashboardTabs from "@/features/pocha/components/dashboard/DashboardTabs";
import DashboardTabContent from "@/features/pocha/components/dashboard/DashboardTabContent";
import usePochaID from "@/features/pocha/hooks/usePochaID";
// import React, { useEffect, useState } from "react";
// [TODO] put this page into auth middleware (no need to handle missing session)

export default function DashboardPage() {
  // fetch necessary information for the dashboard
  // each hook fetches with GET request
  const { isAdmin, email, token, status: adminStatus } = useAdmin();
  const { pochaID, status: pochaIDStatus, error: pochaIDError } = usePochaID();

  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<PochaDashboardTab>(
    (searchParams.get("tab") as PochaDashboardTab) || "orders"
  );

  // const [stockTestVal, setStockTestVal] = useState<number>(0);

  // const handleChangeStock = async (menu: MenuItem) => {
  //   const body = {
  //     menuID: menu.menuID,
  //     quantity: stockTestVal as number,
  //   };

  //   const res = await changeStock(body);

  //   if (res) {
  //     console.log("Stock changed successfully");
  //   } else {
  //     console.error("Stock change failed");
  //   }
  // };

  if (adminStatus === "loading" || pochaIDStatus === "loading") {
    return <LoadingSpinner />;
  }

  if (pochaIDStatus === "error") {
    throw new Error(pochaIDError);
  }

  // only admin can view this page
  if (!isAdmin) {
    return <NotAuthorized />;
  }

  // need to think about how to display orders on dashboard

  return (
    <section className="full-width-container px-2">
      <div className="flex w-full justify-between items-center">
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <p className="text-lg">
          To promote Order Item to next status, 1. select the order item, 2.
          click the Promote button
        </p>
      </div>

      <DashboardTabContent
        email={email}
        token={token}
        pochaID={pochaID}
        activeTab={activeTab}
      />

      {/* <Tabs aria-label="Options">
        <Tab key="orders" title="Orders">
          <OrderDashboard
            email={email}
            token={token}
            pochaID={pochaInfo?.pochaID}
          />
        </Tab>
        <Tab key="stock" title="Stock">
          Under construction
        </Tab>
      </Tabs> */}
    </section>
  );
}
