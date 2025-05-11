import React from "react";
import { ViewListItem } from "./types";
import "./styles.css";

type CustomToggleBarProps = {
  activeView: string;
  setActiveView: (string) => any;
  viewList: ViewListItem[];
};

export default function CustomToggleBar({
  activeView,
  setActiveView,
  viewList = [],
}: CustomToggleBarProps) {
  return (
    <div className="flex text-sm md:text-base mt-1">
      {viewList.map((viewList, index) => (
        <div
          key={index}
          className={`toggle_bar ${
            activeView === viewList.view && "toggle_bar_selected"
          }`}
          onClick={() => setActiveView(viewList.view)}
        >
          {viewList.icon}
          <span>{viewList.text}</span>
        </div>
      ))}
    </div>
  );
}
