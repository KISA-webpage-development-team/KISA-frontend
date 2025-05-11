import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";

export default function DetailPageTitle({ title }) {
  return (
    <div className="absolute top-0 bg-yellow-200 z-20">
      <h1
        className={`${sejongHospitalBold.className}
  text-2xl sm:text-3xl md:text-4xl lg:text-5xl
  `}
      >
        {title}
      </h1>
    </div>
  );
}
