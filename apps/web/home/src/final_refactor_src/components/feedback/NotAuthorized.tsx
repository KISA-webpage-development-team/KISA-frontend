import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import React from "react";

export default function NotAuthorized() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white z-50 flex justify-center items-center">
      {/* [TODO] KISA Logo */}
      <span
        className={`${sejongHospitalBold.className} text-lg text-michigan-blue`}
      >
        권한이 없습니다!
      </span>
    </div>
  );
}
