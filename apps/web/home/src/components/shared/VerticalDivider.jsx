import React from "react";

export default function VerticalDivider({ size = "medium" }) {
  return (
    <div
      className={`${size === "small" ? "h-4" : "h-8"}
  border-[0.5px] md:border border-gray-400
   rounded-lg`}
    ></div>
  );
}
