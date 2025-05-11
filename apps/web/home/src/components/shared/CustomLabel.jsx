import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";

export default function CustomLabel({ htmlFor, text, required = false }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`flex items-start gap-1
      ${sejongHospitalBold.className} text-sm md:text-base`}
    >
      <span>{text}</span>
      {required && <span className="text-red-500">*</span>}
    </label>
  );
}
