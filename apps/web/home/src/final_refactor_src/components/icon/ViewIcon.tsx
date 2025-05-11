import React from "react";
import { FiEye } from "react-icons/fi";
import "./styles.css";

type ViewIconProps = {
  size: "small" | "medium";
  className?: string;
};

export default function ViewIcon({ size, className = "" }: ViewIconProps) {
  return (
    <FiEye
      className={`${className} ${
        size === "small" ? "small_icon !text-xs" : "icon"
      } `}
    />
  );
}
