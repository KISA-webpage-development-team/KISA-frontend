import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import Image from "next/image";
import React from "react";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-48 sm:w-96 aspect-square flex items-center justify-center">
        <Image
          src="/under-construction.png"
          width={300}
          height={300}
          alt="construction"
        />
      </div>

      <p className={`${sejongHospitalBold.className} text-2xl sm:text-4xl`}>
        점검중입니다!
      </p>
    </div>
  );
}
