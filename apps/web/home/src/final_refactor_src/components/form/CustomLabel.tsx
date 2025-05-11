import React from "react";
import { sejongHospitalBold } from "@/utils/fonts/textFonts";
import "./styles.css";

type CustomLabelProps = {
  htmlFor: string;
  text?: string;
  required?: boolean;
};

export default function CustomLabel({
  htmlFor,
  text = "",
  required = false,
}: CustomLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`label
      ${sejongHospitalBold.className}`}
    >
      {text && <span>{text}</span>}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
}
