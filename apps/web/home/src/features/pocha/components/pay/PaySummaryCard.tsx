import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import { sejongHospitalLight } from "@/utils/fonts/textFonts";
import React from "react";
import PochaHorizontalDivider from "../shared/PochaHorizontalDivider";

interface PaySummaryCardProps {
  amount: number;
  fee: number;
  totalPrice: number;
}

export default function PaySummaryCard({
  amount,
  fee,
  totalPrice,
}: PaySummaryCardProps) {
  return (
    <div
      className={`w-full flex flex-col items-start rounded-xl
      border-gray-300 border p-5 ${sejongHospitalBold.className}`}
    >
      <span className="text-lg font-bold">Summary</span>

      <div
        className={`flex flex-col self-stretch mt-3 mb-2 ${sejongHospitalLight.className}`}
      >
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>${amount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Transaction Fee</span>
          <span>${fee}</span>
        </div>
      </div>
      <PochaHorizontalDivider />

      <div className="flex items-center justify-between self-stretch mt-2">
        <span className="font-bold">Total</span>
        <span className="text-xl font-bold">${totalPrice}</span>
      </div>

      <span className={`mt-1 text-[0.6rem] ${sejongHospitalLight.className}`}>
        *수수료는 Stripe 결제 서비스 비용이며, 고정 ($0.3)와 결제 금액의 3.1%를
        합산하여 계산됩니다.
      </span>
    </div>
  );
}
