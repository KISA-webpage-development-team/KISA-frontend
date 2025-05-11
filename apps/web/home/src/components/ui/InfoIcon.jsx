import React from "react";
import { CiCircleInfo } from "react-icons/ci";

export default function InfoIcon({ color }) {
  return (
    <CiCircleInfo
      className={`w-5 h-5 font-bold ${
        color === "error" ? "text-red-500" : "text-blue-500"
      }`}
    />
  );
}
