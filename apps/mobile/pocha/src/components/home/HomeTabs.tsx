/**
 * HomeTabs
 * - render Tabs UI for Pocha Home Page
 * - handle tab change logic
 */

import React, {useState} from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
// import {
//   sejongHospitalBold,
//   sejongHospitalLight,
// } from "@/utils/fonts/textFonts";
// types
import { PochaTab } from "@/types/pocha";
import { updateURLWithTab } from "../../utils/updateURL";

//type HomeTabsProps = {
  //activeTab: PochaTab;
  //setActiveTab: (tab: PochaTab) => void;
//};

type PochaTab = "menu" | "orders";

//export default function HomeTabs({ activeTab, setActiveTab }: HomeTabsProps) {
  //const handleTabChange = (selectedTab: PochaTab) => {
    //updateURLWithTab(selectedTab);
    //setActiveTab(selectedTab);
  //};

export default function HomeTabs() {
  // Default tab is "menu"
  const [activeTab, setActiveTab] = useState<PochaTab>("menu");

  const handleTabChange = (selectedTab: PochaTab) => {
    setActiveTab(selectedTab);
  };

  // const getTabClassName = (isCurTabSelected: boolean) => {
  //   return `flex-1 px-4 py-3 text-center relative transition-all duration-200 ease-in-out 
  //   after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 text-lg
  //   ${
  //     isCurTabSelected
  //       ? `text-michigan-blue font-semibold ${sejongHospitalBold.className} after:bg-michigan-blue`
  //       : `text-gray-400 ${sejongHospitalBold.className} after:bg-gray-200`
  //   }`;
  // };

  return (
  //<div className="flex">
     // <button
        //className={getTabClassName(activeTab === "menu")}
        //onClick={() => handleTabChange("menu")}
      //>
        //Menu
      //</button>
      //<button
        //className={getTabClassName(activeTab === "orders")}
        //onClick={() => handleTabChange("orders")}
      //>
        //Orders
      //</button>
    //</div>

  );

const styles = StyleSheet.create({

container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 16,
    color: "#9CA3AF", // Gray-400 color
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#00274D", // Michigan Blue
  },
  activeTab: {
    backgroundColor: "#F3F4F6", // Light gray background for active tab
  },
  inactiveTab: {
    backgroundColor: "transparent",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#00274D", // Michigan Blue underline
  },
  })
}

