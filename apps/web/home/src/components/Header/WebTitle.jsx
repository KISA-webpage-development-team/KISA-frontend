import Link from "next/link";
import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function WebTitle() {
  return (
    <Link href="/" className="flex flex-col items-start gap-0">
      <h1
        className={`text-xs md:text-sm 
    font-bold ${sejongHospitalBold.className}`}
      >
        University of Michigan
      </h1>
      <h1
        className={`flex items-center 
    text-xl lg:text-2xl font-bold ${sejongHospitalBold.className}`}
      >
        한인 학생회
      </h1>
    </Link>
  );
}
