import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function EventSectionTitle({ title }) {
  return (
    <span
      className={`${sejongHospitalBold.className} text-lg md:text-xl lg:text-2xl `}
    >
      {title}
    </span>
  );
}
