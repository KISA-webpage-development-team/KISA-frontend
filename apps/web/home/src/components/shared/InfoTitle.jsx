import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function InfoTitle({ title }) {
  return (
    <div className="w-full flex flex-col gap-2 md:gap-4">
      <span
        className={`${sejongHospitalBold.className} text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] text-left`}
      >
        {title}
      </span>
      <div className="w-full border-b-2 border-black" />
    </div>
  );
}
