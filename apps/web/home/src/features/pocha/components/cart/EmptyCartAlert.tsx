import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import Image from "next/image";
import React from "react";

export default function EmptyCartAlert() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={`/images/empty_cart.png`}
        alt="Empty Cart Icon"
        width={300}
        height={300}
      />
      <div className={`${sejongHospitalBold.className} text-center mt-4`}>
        Your Cart is Empty
      </div>
    </div>
  );
}
