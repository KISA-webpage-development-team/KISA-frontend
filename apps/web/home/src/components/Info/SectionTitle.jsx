import React from "react";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";
import Link from "next/link";

export default function SectionTitle({
  align = "center",
  infoType,
  sectionName,
  sectionText,
}) {
  const sectionLink = `/info/${infoType}/detail/${sectionName}`;

  return (
    <Link
      href={sectionLink}
      className={`${align === "center" ? "text-center" : "text-left"}`}
    >
      <span
        className={`${sejongHospitalBold.className} text-xl md:text-3xl text-black hover:text-gray-600`}
      >
        {sectionText}
      </span>
    </Link>
  );
}
