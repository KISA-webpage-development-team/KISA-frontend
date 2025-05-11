import React from "react";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
// types
import { PochaDashboardTab } from "@/types/pocha";
import { updateURLWithTab } from "../../utils/updateURL";

type DashboardTabsProps = {
  activeTab: PochaDashboardTab;
  setActiveTab: (tab: PochaDashboardTab) => void;
};

export default function DashboardTabs({
  activeTab,
  setActiveTab,
}: DashboardTabsProps) {
  const handleTabChange = (selectedTab: PochaDashboardTab) => {
    updateURLWithTab(selectedTab);
    setActiveTab(selectedTab);
  };

  const getTabClassName = (isCurTabSelected: boolean) => {
    return `flex-1 px-4 py-3 text-center relative transition-all duration-200 ease-in-out 
    after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 text-lg
    ${
      isCurTabSelected
        ? `text-michigan-blue font-semibold ${sejongHospitalBold.className} after:bg-michigan-blue`
        : `text-gray-400 ${sejongHospitalBold.className} after:bg-gray-200`
    }`;
  };

  return (
    <div className="flex">
      <button
        className={getTabClassName(activeTab === "orders")}
        onClick={() => handleTabChange("orders")}
      >
        Orders
      </button>
      <button
        className={getTabClassName(activeTab === "stock")}
        onClick={() => handleTabChange("stock")}
      >
        Stock
      </button>
      <button
        className={getTabClassName(activeTab === "history")}
        onClick={() => handleTabChange("history")}
      >
        History
      </button>
    </div>
  );
}
