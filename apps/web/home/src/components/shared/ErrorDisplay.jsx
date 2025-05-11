import React from "react";
import InfoIcon from "../ui/InfoIcon";

export default function ErrorDisplay({ state = "error", text }) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <InfoIcon color={state} />
      <span
        className={`text-xs md:text-sm ${
          state === "error" ? "text-red-500" : "text-blue-500"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
