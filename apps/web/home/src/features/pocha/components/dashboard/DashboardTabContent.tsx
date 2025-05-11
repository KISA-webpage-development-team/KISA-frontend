/**
 * HomeTabContent
 * - Displays the menu or order list depending on the active tab
 * - Displays the cart button if the active tab is menu
 */

import { PochaDashboardTab } from "@/types/pocha";
import { memo } from "react";
import OrderDashboard from "./OrderDashboard";
import OrderHistoryTable from "./OrderHistoryTable";
import StockManager from "./StockManager";

interface DashboardTabContentProps {
  email: string | undefined;
  token: string | undefined;
  pochaID: number;

  activeTab: PochaDashboardTab;
}

function DashboardTabContent({
  email,
  token,
  pochaID,
  activeTab,
}: DashboardTabContentProps) {
  return (
    <div className="flex flex-col justify-between w-full relative">
      {/* Content Area with Scrollable Section */}
      {activeTab === "orders" ? (
        <OrderDashboard pochaID={pochaID} email={email} token={token} />
      ) : activeTab === "stock" ? (
        <StockManager pochaID={pochaID} token={token} />
      ) : activeTab === "history" ? (
        <OrderHistoryTable token={token} pochaID={pochaID} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default memo(DashboardTabContent);
