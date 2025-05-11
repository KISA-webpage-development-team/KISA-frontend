import React from "react";
import { sejongHospitalLight } from "../../utils/fonts/textFonts";

export default function EventSectionDesc({ desc }) {
  return (
    <p
      className={`${sejongHospitalLight.className}
     text-sm md:text-lg lg:text-xl`}
    >
      {desc}
    </p>
  );
}
