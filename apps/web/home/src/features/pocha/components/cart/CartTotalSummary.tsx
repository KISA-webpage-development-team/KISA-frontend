import React from "react";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";

interface CartTotalSummaryProps {
  totalAmount: number;
}

export default function CartTotalSummary({
  totalAmount,
}: CartTotalSummaryProps) {
  return (
    <div
      className={`flex justify-between w-full py-4 
    ${sejongHospitalBold.className} text-lg text-black`}
    >
      <span>Total</span>
      <span className={``}>${totalAmount}</span>
    </div>
  );
}
