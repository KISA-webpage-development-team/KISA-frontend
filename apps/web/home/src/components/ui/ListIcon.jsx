import React from "react";
import { IoListOutline } from "react-icons/io5";

export default function ListIcon({ size = "small" }) {
  return (
    <IoListOutline
      className={`${
        size === "medium" ? "text-lg md:text-2xl" : "w-4 h-4"
      } text-black`}
    />
  );
}
