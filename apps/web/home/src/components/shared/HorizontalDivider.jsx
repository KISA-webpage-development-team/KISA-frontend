import React from "react";

export default function HorizontalDivider({ color = "light" }) {
  return (
    <div
      className={`border w-full ${
        color === "light" ? "border-gray-200/60" : "border-gray-300"
      } rounded-lg`}
    ></div>
  );
}
