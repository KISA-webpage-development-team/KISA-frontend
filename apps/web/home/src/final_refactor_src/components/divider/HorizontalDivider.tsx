import React from "react";

export type HorizontalDividerColor = "light" | "gray";

type HorizontalDividerProps = {
  color?: HorizontalDividerColor;
};

export default function HorizontalDivider({
  color = "light",
}: HorizontalDividerProps) {
  return (
    <div
      className={`border w-full ${
        color === "light" ? "border-gray-200/60" : "border-gray-300"
      } rounded-lg`}
    ></div>
  );
}
