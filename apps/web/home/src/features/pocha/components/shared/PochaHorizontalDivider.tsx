import React from "react";

type PochaHorizontalDividerProps = {
  fullWidth?: boolean;
};

export default function PochaHorizontalDivider({
  fullWidth = false,
}: PochaHorizontalDividerProps) {
  // [NOTE] -translate-x-4 is bit dangerous
  // it might break other component's styling on the same page
  // such as fixed position
  return (
    <hr
      className={`border-1 border-[#CACACA] ${
        fullWidth ? "w-screen -translate-x-4" : "w-full mx-auto"
      }`}
    />
  );
}
