import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import React from "react";

export default function UnexpectedError() {
  return (
    <div
      className="md:text-lg 
    w-full flex flex-col items-center "
    >
      <p className={`${sejongHospitalBold.className} mb-2`}>
        예기치 못한 오류가 발생했습니다!
      </p>
    </div>
  );
}
