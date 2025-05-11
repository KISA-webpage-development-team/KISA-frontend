/**
 * HomeTabs
 * - render Tabs UI for Pocha Home Page
 * - handle tab change logic
 */

import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "@/utils/fonts/textFonts";
// types
import { PochaTab } from "@/types/pocha";
import { updateURLWithTab } from "../../utils/updateURL";

type HomeTabsProps = {
  activeTab: PochaTab;
  setActiveTab: (tab: PochaTab) => void;
};

export default function HomeTabs({ activeTab, setActiveTab }: HomeTabsProps) {
  const handleTabChange = (selectedTab: PochaTab) => {
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
        className={getTabClassName(activeTab === "menu")}
        onClick={() => handleTabChange("menu")}
      >
        Menu
      </button>
      <button
        className={getTabClassName(activeTab === "orders")}
        onClick={() => handleTabChange("orders")}
      >
        Orders
      </button>
    </div>
  );
}
