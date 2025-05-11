import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";

export default function SectionImage({
  priority = false,
  sectionLink,
  name,
  id,
}) {
  return (
    <Link
      key={id}
      href={`${sectionLink}#${id}`}
      className="relative flex items-center aspect-square "
    >
      {/* Image */}
      <Image
        src={`/images/${id}.png`}
        className="aspect-square object-cover z-0"
        alt={name}
        fill
        priority={priority}
      />

      {/* Cover */}
      <div
        className="absolute flex flex-col gap-2 justify-center items-center w-full h-full 
          bg-[#2F2F2F] bg-opacity-40 hover:bg-opacity-10 px-4 transition-all duration-300 ease-in-out cursor-pointer"
      >
        {name.split("\n").map((line, index) => (
          <span
            key={index}
            className={`cover_text ${sejongHospitalBold.className}`}
          >
            {line}
          </span>
        ))}
      </div>
    </Link>
  );
}
